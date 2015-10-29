/**
 * How do you want to get your access_token ?
 * 
 * @param {string} access_token
 */
exports.getToken = function getToken()
{
	return sessionStorage["OAUTH2_TOKEN"];
};