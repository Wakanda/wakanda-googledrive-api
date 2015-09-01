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

/**
 * Returns the download folder.
 * By default, it's a /tmp/ folder in the project.
 * 
 * @param {string} download_folder_path
 */
exports.getDownloadFolder = function getDownloadFolder()
{
	return "/PROJECT/tmp/";
};
