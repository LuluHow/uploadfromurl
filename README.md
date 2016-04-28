# uploadfromurl

Get Javascript File object from URL, like from <input type="file">.

# Usage
  
  <pre>
  	UploadFromUrl.run('http://i.imgur.com/sBJOoTm.png').then(function(data) {
		console.log(data); //data[0] contains File Object & data[1] contains the base64 data
	});
	
	
	UploadFromUrl.run('http://i.imgur.com/sBJOoTm.png', '--with-blob').then(function(data) {
		console.log(data); //data[0] contains File Object & data[1] contains the base64 data
	});
  </pre>
