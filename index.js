var tools	= require('./tools');

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - access_token
 */
exports.setAccessToken = tools.setAccessToken;

/**
 * Gets a file's metadata by ID
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.getFile = function getFile(fileId)
{
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files/'+ fileId );
}

/**
 * Copy a file by ID
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.copyFile = function copyFile(fileId)
{
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/copy');
}

/**
 * Convert a file to the corresponding Google Docs format.
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.convertFileToGoogleFormat = function copyFile(fileId)
{
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/copy?convert=true');
}

/**
 * Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file.
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.deleteFile = function deleteFile(fileId)
{
	return tools.send('DELETE', 'https://www.googleapis.com/drive/v2/files/'+ fileId );	
}

/**
 * Search for one or some files
 * 
 * Help for how to create a query string
 * https://developers.google.com/drive/web/search-parameters
 */
exports.queryFile = function queryFile(query)
{
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files?q='+ encodeURIComponent(query) );	
}

/**
 * Lists the user's files.
 */
exports.listAllFiles = function listAllFiles()
{
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files' );
}

/**
 * Moves a file to the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.trashFile = function trashFile(fileId)
{
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/trash');
}

/**
 * Restores a file from the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 */
exports.untrashFile = function untrashFile(fileId)
{
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/untrash');	
}

/**
 * Permanently deletes all of the user's trashed files.
 */
exports.emptyTrash = function emptyTrash()
{
	return tools.send('DELETE', 'https://www.googleapis.com/drive/v2/files/trash');
}
