// Generated by CoffeeScript 1.10.0
(function() {
  this.UploadFromUrl = (function() {
    function UploadFromUrl() {}

    UploadFromUrl._getXHRObject = function() {
      return new XMLHttpRequest();
    };

    UploadFromUrl._getFileReaderObject = function() {
      return new window.FileReader();
    };

    UploadFromUrl._getBlob = function(url) {
      var xhr;
      xhr = this._getXHRObject();
      return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
            return resolve(xhr.response);
          }
        };
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        return xhr.send();
      });
    };

    UploadFromUrl._blobToFile = function(blob, name) {
      return new File([blob], name, {
        type: blob.type
      });
    };

    UploadFromUrl._getNameFromUrl = function(url) {
      return url.split('/').splice(-1)[0];
    };

    UploadFromUrl._getBase64 = function(object) {
      var that;
      that = this;
      return new Promise(function(resolve, reject) {
        var reader;
        reader = that._getFileReaderObject();
        reader.readAsDataURL(object);
        reader.onloadend = function() {
          var base64data;
          base64data = reader.result;
          return resolve(base64data);
        };
      });
    };

    UploadFromUrl.run = function(url, opts) {
      var that;
      that = this;
      return new Promise(function(resolve, reject) {
        var _fileName;
        _fileName = that._getNameFromUrl(url);
        that._getBlob(url).then(function(blob) {
          return that._getBase64(blob).then(function(base64) {
            var _to_file;
            _to_file = opts === "--with-blob" ? blob : that._blobToFile(blob, _fileName);
            return resolve([_to_file, base64]);
          });
        });
      });
    };

    return UploadFromUrl;

  })();

}).call(this);
