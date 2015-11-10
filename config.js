/**
 * How do you want to get your access_token ?
 * This method is used by setAccessToken() if no access_token parameter is sent.
 * 
 * @param {string} access_token
 */
exports.getToken = function getToken( provider )
{
	return sessionStorage[ provider +'_'+ "OAUTH2_TOKEN" ];
};