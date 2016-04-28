class @UploadFromUrl

	@_getXHRObject: ->
		new XMLHttpRequest()

	@_getFileReaderObject: ->
		new window.FileReader()

	@_getBlob: (url) ->
		xhr = @_getXHRObject()
		return new Promise (resolve, reject) ->
			xhr.onreadystatechange = () ->
				if xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)
					resolve xhr.response

			xhr.open 'GET', url, true
			xhr.responseType = 'blob'
			xhr.send()

	@_blobToFile: (blob, name) ->
		new File [ blob ], name, { type: blob.type }

	@_getNameFromUrl: (url) ->
		url.split('/').splice(-1)[0]

	@_getBase64: (object) ->
		that = @
		return new Promise (resolve, reject) ->
			reader = that._getFileReaderObject()

			reader.readAsDataURL object
			reader.onloadend = ->
				base64data = reader.result
				resolve base64data
			return

	@run: (url, opts) ->
		that = @
		return new Promise (resolve, reject) ->
			_fileName = that._getNameFromUrl url
			that._getBlob url
				.then (blob) ->
					that._getBase64 blob
						.then (base64) ->
							_to_file = if opts == "--with-blob" then blob else that._blobToFile(blob, _fileName) 
							resolve [ _to_file, base64 ]
			return 