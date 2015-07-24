var tools = require('./tools');

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
 * @return {Object} File resource description
 */
exports.getFile = function getFile(fileId)
{
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files/'+ fileId );
}

/**
 * Copy a file by ID
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description
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
 * Help for how to create a query string: https://developers.google.com/drive/web/search-parameters
 * 
 * @param {string} query - query string as describe in google drive api
 * @return {Object} File resource description
 */
exports.queryFile = function queryFile(query)
{
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files?q='+ encodeURIComponent(query) );	
}

/**
 * Lists the user's files.
 * 
 * @return {Object} File resource descriptions
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

/**
 * Rename a file. Keep the same file extension.
 * 
 * @param {string} fileId - Google Drive file ID
 * @param {string} fileName - The new file name to apply
 */
exports.renameFile = function renameFile(fileId, fileName)
{
	var requestBody = {'title': decodeURIComponent(fileName)};
	return tools.send('PUT', 'https://www.googleapis.com/drive/v2/files/'+ fileId, requestBody);
}

/**
 * Create an empty file.
 * 
 * @param {string} fileName - Google Drive file name (ex: fibonacci.js)
 * @return {Object} File resource description
 */
exports.createFile = function createFile(fileName)
{
	var requestBody = {'title': decodeURIComponent(fileName)};
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files', requestBody);
}

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource descriptions
 */
exports.listElementsInFolder = function listElementsInFolder(folderId)
{
	folderId = folderId ? folderId : 'root';
	return tools.send('GET', 'https://www.googleapis.com/drive/v2/files/'+ folderId +'/children');
}

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} folderName - Google Drive folder name
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource descriptions
 */
exports.createFolder = function createFolder(folderName, folderId)
{
	var requestBody = {
		'title': decodeURIComponent(folderName),
		'mimeType': 'application/vnd.google-apps.folder'
	};
	if (folderId)
		requestBody.parents = [{'id': decodeURIComponent(folderId)}];
		
	return tools.send('POST', 'https://www.googleapis.com/drive/v2/files', requestBody);
}

/**
 * Gets a file's metadata by ID. No extension or it will be consider as a file.
 * 
 * @param {string} folderId - Google Drive folder ID
 * @param {string} folderName - The new folder name to apply
 */
exports.renameFolder = function renameFolder(folderId, folderName)
{
	var requestBody = {'title': decodeURIComponent(folderName)};
	return tools.send('PUT', 'https://www.googleapis.com/drive/v2/files/'+ folderId, requestBody);
}