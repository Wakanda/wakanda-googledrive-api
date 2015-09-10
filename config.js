/**
 * Returns the oauth2 token.
 * By default, it's store in sessionStorage["OAUTH2_TOKEN"];
 * 
 * @param {string} access_token
 */
exports.getToken = function getToken()
{
	return sessionStorage["OAUTH2_TOKEN"];
};