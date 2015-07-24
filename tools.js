var Tools = function()
{
    this.access_token;
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
 * Send XHR request to googleDrive with parameters
 * 
 * @param {string} method - method (POST, GET, DELETE)
 * @param {string} url - XHR url with parameters
 * 
 * @return {Object} response - the JSON.parse XHR response
 */
Tools.prototype.send = function send(method, url, body, options)
{
    body = body ? JSON.stringify(body) : '';
    options = options ? this.jsonToUrlString(options) : '';
    
	var xhr = new XMLHttpRequest();
    xhr.open( method , url+'?'+options, false );
    xhr.setRequestHeader( 'Authorization' , 'Bearer '+ this.access_token);
    xhr.setRequestHeader( 'Content-Type' , 'application/json' );
    xhr.send(body);

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
