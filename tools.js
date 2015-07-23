var access_token;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - access_token
 */
exports.setAccessToken = function setAccessToken(token)
{
	access_token = token;
}

/**
 * Send XHR request to googleDrive with parameters
 * 
 * @param {string} method - method (POST, GET, DELETE)
 * @param {string} url - XHR url with parameters
 * 
 * @return {Object} response - the JSON.parse XHR response
 */
exports.send = function send(method, url, option)
{
    url = url + ( option ? core.jsonToUrlString(option) : '' );
    
	var xhr = new XMLHttpRequest();
    xhr.open( method , url, false );
    xhr.setRequestHeader( 'Authorization' , 'Bearer '+ access_token);
    xhr.send();
	
    if (xhr.responseText)
	   return JSON.parse( xhr.responseText );
}

/**
 * Stringify params for body XHR
 * 
 * @param {Object} params - convert key:value to key=value
 * 
 * @return {string} body - the stringify params to append inside a body XHR
 */
exports.jsonToUrlString = function jsonToUrlString( params )
{
	var body = '?';
    for ( var key in params )
    {
    	body += key + '=' + encodeURIComponent( params[ key ] ) + '&'
    }
    return body;
}