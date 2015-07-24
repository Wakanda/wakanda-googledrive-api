
var Drive = function()
{
	var Tools = require('./tools');
	this.myTools = new Tools();
};
module.exports = Drive;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} token - access_token
 */
Drive.prototype.setAccessToken = function setAccessToken(access_token) {
	this.myTools.setAccessToken(access_token);
}

/**
 * Gets a file's metadata by ID
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description
 */
Drive.prototype.getFile = function getFile(fileId)
{
	return this.myTools.send('GET', 'https://www.googleapis.com/drive/v2/files/'+ fileId );
};

/**
 * Copy a file by ID
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description
 */
Drive.prototype.copyFile = function copyFile(fileId)
{
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/copy');
};

/**
 * Convert a file to the corresponding Google Docs format.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.convertFileToGoogleFormat = function copyFile(fileId)
{
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/copy?convert=true');
};

/**
 * Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.deleteFile = function deleteFile(fileId)
{
	return this.myTools.send('DELETE', 'https://www.googleapis.com/drive/v2/files/'+ fileId );	
};

/**
 * Search for one or some files
 * Help for how to create a query string: https://developers.google.com/drive/web/search-parameters
 * 
 * @param {string} query - query string as describe in google drive api
 * @return {Object} File resource description
 */
Drive.prototype.queryFile = function queryFile(query)
{
	return this.myTools.send('GET', 'https://www.googleapis.com/drive/v2/files?q='+ encodeURIComponent(query) );	
};

/**
 * Lists the user's files.
 * 
 * @return {Object} File resource descriptions
 */
Drive.prototype.listAllFiles = function listAllFiles()
{
	return this.myTools.send('GET', 'https://www.googleapis.com/drive/v2/files' );
};

/**
 * Moves a file to the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.trashFile = function trashFile(fileId)
{
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/trash');
};

/**
 * Restores a file from the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.untrashFile = function untrashFile(fileId)
{
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files/'+ fileId +'/untrash');	
};

/**
 * Permanently deletes all of the user's trashed files.
 */
Drive.prototype.emptyTrash = function emptyTrash()
{
	return this.myTools.send('DELETE', 'https://www.googleapis.com/drive/v2/files/trash');
};

/**
 * Rename a file. Keep the same file extension.
 * 
 * @param {string} fileId - Google Drive file ID
 * @param {string} fileName - The new file name to apply
 */
Drive.prototype.renameFile = function renameFile(fileId, fileName)
{
	var requestBody = {'title': decodeURIComponent(fileName)};
	return this.myTools.send('PUT', 'https://www.googleapis.com/drive/v2/files/'+ fileId, requestBody);
};

/**
 * Create an empty file.
 * 
 * @param {string} fileName - Google Drive file name (ex: fibonacci.js)
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description
 */
Drive.prototype.createFile = function createFile(fileName, folderId)
{
	var requestBody = {'title': decodeURIComponent(fileName)};
	if (folderId)
		requestBody.parents = [{'id': decodeURIComponent(folderId)}];
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files', requestBody);
};

/**
 * Create an empty file.
 * 
 * @param {string} fileId - Google Drive file id
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description
 */
Drive.prototype.moveFile = function moveFile(fileId, folderId)
{
	var requestBody = { 'parents': [ {'id': decodeURIComponent(folderId)} ]};
	return this.myTools.send('PUT', 'https://www.googleapis.com/drive/v2/files/'+fileId, requestBody);
};

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource descriptions
 */
Drive.prototype.listElementsInFolder = function listElementsInFolder(folderId)
{
	folderId = folderId ? folderId : 'root';
	return this.myTools.send('GET', 'https://www.googleapis.com/drive/v2/files/'+ folderId +'/children');
};

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} folderName - Google Drive folder name
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource descriptions
 */
Drive.prototype.createFolder = function createFolder(folderName, folderId)
{
	var requestBody = {
		'title': decodeURIComponent(folderName),
		'mimeType': 'application/vnd.google-apps.folder'
	};
	if (folderId)
		requestBody.parents = [{'id': decodeURIComponent(folderId)}];
		
	return this.myTools.send('POST', 'https://www.googleapis.com/drive/v2/files', requestBody);
};

/**
 * Gets a file's metadata by ID. No extension or it will be consider as a file.
 * 
 * @param {string} folderId - Google Drive folder ID
 * @param {string} folderName - The new folder name to apply
 */
Drive.prototype.renameFolder = function renameFolder(folderId, folderName)
{
	var requestBody = {'title': decodeURIComponent(folderName)};
	return this.myTools.send('PUT', 'https://www.googleapis.com/drive/v2/files/'+ folderId, requestBody);
};

/**
 * Permanently deletes a folder by its ID and all its content (files and folders). Skips the trash. The currently authenticated user must own the file.
 * 
 * @param {string} folderId - Google Drive folder ID
 */
Drive.prototype.deleteFolder = function deleteFolder(folderId)
{
	return this.myTools.send('DELETE', 'https://www.googleapis.com/drive/v2/files/'+ folderId );	
};

