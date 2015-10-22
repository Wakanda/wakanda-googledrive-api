
/**
 * Tools constructor. Private module for GoogleDrive module. 
 * 
 * @param {string} [baseUrl] - Set the baseUrl for XHR request to Google Drive API. Default: https://www.googleapis.com/drive/v2/
 */
var Tools = function(myBaseUrl, myUploadUrl)
{
	this.baseUrl = myBaseUrl ? myBaseUrl : 'https://www.googleapis.com/drive/v2/';
	this.uploadUrl = myUploadUrl ? myUploadUrl : 'https://www.googleapis.com/upload/drive/v2/';
};
module.exports = Tools;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - Set this.access_token
 */
Tools.prototype.setAccessToken = function setAccessToken(token)
{
	this.access_token = token;
};

/**
 * Set the access_token getter defined in config.js
 * 
 * @param {string} token - Set this.access_token_getter
 */
Tools.prototype.setAccessTokenGetter = function setAccessTokenGetter(module)
{
	this.access_token_getter = module;
};

/**
 * Send XHR request to googleDrive with parameters
 * 
 * @param {string} method - method (POST, GET, PUT, DELETE)
 * @param {string} url - XHR url with parameters
 * @param {Object} [params] - optional parameters object
 * @param {Object} [params.body] - body parameters
 * @param {boolean} [params.binary] - isBinary ? Used for download
 * 
 * @return {Object} response - the JSON.parse XHR response
 */
Tools.prototype.send = function send(method, url, params)
{
	var body = '';
	var binary = false;
	var token = this.access_token_getter ? this.access_token_getter.getToken() : this.access_token;
	if (params)
	{
		body = params.body ? JSON.stringify(params.body) : '';
		binary = params.binary ? params.binary : false;
	}

	// Set the request
	var xhr = new XMLHttpRequest();	
	xhr.open( method , this.baseUrl + url , false );
	xhr.setRequestHeader( 'Authorization' , 'Bearer '+ token);
	xhr.setRequestHeader( 'Content-Type' , 'application/json' );
	
	// Handle Download
	if(binary)
	{
		xhr.responseType = 'blob';
	}
	
	// Send request
	xhr.send(body);
	
	// Handle redirection
	if(binary){
		
		if ([301, 302, 303, 307, 308].indexOf(xhr.status) > -1) {
			url = xhr.getResponseHeader('Location');
			return this.send(params);
		}
		if ((xhr.status !== 200) || !xhr.response ||  !xhr.response.size) {
			return null;
		}

		return {
			buffer : xhr.response.toBuffer(),
			contentType : xhr.getResponseHeader("Content-Type")
		};
	}
	
	// Return result
	if (xhr.responseText)
		return JSON.parse( xhr.responseText );
};

/**
 * Send XHR request to googleDrive with parameters
 * 
 * @param {string} method - method (POST, GET, PUT, DELETE)
 * @param {string} url - XHR url with parameters
 * @param {Object} params
 * @param {file} params.file - file to upload
 * @param {Object} params.body - [optional] contains fileName and folderId
 * 
 * @return {Object} response - the JSON.parse XHR response
 */
Tools.prototype.upload = function upload(method, url, params)
{
	
	if (params.file.size > 5000000)
		throw {error: 'file size to upload exced 5Mo.'}
	
	var translator = {
		pdf: 'application/pdf',
		json: 'application/json',
		js: 'application/javascript',
		zip: 'application/zip',
		gif: 'image/gif',
		jpg: 'image/jpeg',
		png: 'image/png',
		txt: 'text/plain',
		mpeg: 'video/mpeg',
		mp4: 'video/mp4',
		qt: 'video/quicktime',
		doc: 'application/msword',
		ppt: 'application/vnd.ms-powerpoint',
		xls: 'application/vnd.ms-excel'
	};
	var fileExtension = translator[params.file.extension];

	var body = '';
	if (params)
	{
		body = params.body ? params.body : '';
		if (!params.body.title)
			body.title = params.file.name;
	}
	body.mimeType = fileExtension; // TODO file.type should be used instead. But not working right now.
	body = JSON.stringify(body);
	
	var token = this.access_token_getter ? this.access_token_getter.getToken() : this.access_token;
	var boundary = '314159265358979323846';
	var multipartRequestBody =
		'\r\n--' + boundary +
		'\r\nContent-Type: application/json'+
		'\r\n\r\n' + body +
		'\r\n--' + boundary +
		'\r\nContent-Type: ' + fileExtension + // TODO file.type should be used instead. But not working right now.
		'\r\nContent-Transfer-Encoding: base64' +
		'\r\n\r\n' + params.file.toBuffer().toString('base64') +
		'\r\n--' + boundary + '--';
		
	// Set the request
	var xhr = new XMLHttpRequest();	
	xhr.open( method , this.uploadUrl + url, false );
	xhr.setRequestHeader( 'Authorization' , 'Bearer '+ token);
	xhr.setRequestHeader( 'Content-Type' , 'multipart/related; boundary="' + boundary + '"'); 
	xhr.setRequestHeader( 'Content-Length' , multipartRequestBody.length);

	// Send request
	xhr.send(multipartRequestBody);
	
	// Return result
	if (xhr.responseText)
		return JSON.parse( xhr.responseText );
};

/**
 * Stringify params for body XHR
 * 
 * @param {Object} params - convert key:value to key=value
 * 
 * @return {string} body - the stringify params to append inside a body XHR
 */
Tools.prototype.jsonToUrlString = function jsonToUrlString( params )
{
	var body = '';
	for ( var key in params )
	{
		body += key + '=' + encodeURIComponent( params[ key ] ) + '&'
	}
	return body;
};
