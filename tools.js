
/**
 * Send XHR request to googleDrive with parameters
 * 
 * @param {string} method - method (POST, GET, DELETE)
 * @param {string} url - XHR url with parameters
 * 
 * @return {Object} response - the JSON.parse XHR response
 */
function send(method, url, option)
{
    url = url + ( option ? core.jsonToUrlString(option) : '' );
	var access_token = core.getAccessToken();
    
	var xhr = new XMLHttpRequest();
    xhr.open( method , url, false );
    xhr.setRequestHeader( 'Authorization' , 'Bearer '+ access_token);
    xhr.send();
	
	return JSON.parse( xhr.responseText );
}

/**
 * Stringify params for body XHR
 * 
 * @param {Object} params - convert key:value to key=value
 * 
 * @return {string} body - the stringify params to append inside a body XHR
 */
function jsonToUrlString( params )
{
	var body = "?";
    for ( var key in params )
    {
    	body += key + '=' + encodeURIComponent( params[ key ] ) + '&'
    }
    return body;
}
