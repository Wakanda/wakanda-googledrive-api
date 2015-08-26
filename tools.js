
/**
 * Tools constructor. Private module for GoogleDrive module. 
 * 
 * @param {string} [baseUrl] - Set the baseUrl for XHR request to Google Drive API. Default: https://www.googleapis.com/drive/v2/
 */
var Tools = function(myBaseUrl)
{
    this.baseUrl = myBaseUrl ? myBaseUrl : 'https://www.googleapis.com/drive/v2/';
};
module.exports = Tools;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - access_token
 */
Tools.prototype.setAccessToken = function setAccessToken(token)
{
	this.access_token = token;
};

/**
 * Set the access_token getter defined in token.js
 * 
 * @param {string} token - access_token
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
	if (params)
	{
		body = params.body ? JSON.stringify(params.body) : '';
	}
    var token = this.access_token_getter ? this.access_token_getter.getToken() : this.access_token;
	var xhr = new XMLHttpRequest();
	
    xhr.open( method , this.baseUrl + url, false );
   	xhr.setRequestHeader( 'Authorization' , 'Bearer '+ token);
    xhr.setRequestHeader( 'Content-Type' , 'application/json' );
    xhr.send(body);
	 
    /*
    if(binary){
    	xhr.responseType = 'blob';
    }
    xhr.send(body);
	
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
	}*/
	
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
