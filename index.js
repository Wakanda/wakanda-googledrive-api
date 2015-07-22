var files	= require('./files');
var parents = require('./parents');
var access_token;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - access_token
 */
function setAccessToken(token)
{
	access_token = token;
}

/**
 * Get the access_token
 * 
 * @return {string} access_token
 */
function getAccessToken()
{
	return access_token;
}

exports.files = files;
exports.parents = parents;
exports.setAccessToken = setAccessToken;
exports.getAccessToken = getAccessToken;