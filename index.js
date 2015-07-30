
/**
 * GoogleDrive constructor. Starting point to use the googleDrive API.
 */
var Drive = function()
{
	var Tools = require('./tools');
	this.myTools = new Tools('https://www.googleapis.com/drive/v2/');
};
module.exports = Drive;

/**
 * Set the access_token retrieved from oauth2 authentification
 * 
 * @param {string} access_token
 */
Drive.prototype.setAccessToken = function setAccessToken(access_token)
{
	this.myTools.setAccessToken(access_token);
};

/**
 * Gets a file's metadata by ID
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.getFile = function getFile(fileId)
{
	return this.myTools.send('GET', 'files/'+ fileId);
};

/**
 * Copy a file by ID
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.copyFile = function copyFile(fileId)
{
	return this.myTools.send('POST', 'files/'+ fileId +'/copy');
};

/**
 * Convert a file to the corresponding Google Docs format.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.convertFileToGoogleFormat = function convertFileToGoogleFormat(fileId)
{
	return this.myTools.send('POST', 'files/'+ fileId +'/copy?convert=true');
};

/**
 * Permanently deletes a file by ID. Skips the trash. The currently authenticated user must own the file.
 * 
 * @param {string} fileId - Google Drive file ID
 */
Drive.prototype.deleteFile = function deleteFile(fileId)
{
	return this.myTools.send('DELETE', 'files/'+ fileId );	
};

/**
 * Search for one or some files
 * Help for how to create a query string: https://developers.google.com/drive/web/search-parameters
 * 
 * @param {string} query - query string as describe in google drive api
 * @return {Object} {
  "kind": "drive#fileList",
  "etag": etag,
  "selfLink": string,
  "nextPageToken": string,
  "nextLink": string,
  "items": [
    files Resource https://developers.google.com/drive/v2/reference/files
  ]
}
 */
Drive.prototype.queryFile = function queryFile(query)
{
	return this.myTools.send('GET', 'files?q='+ encodeURIComponent(query) );	
};

/**
 * Lists the user's files.
 * 
 * @return {Object} {
  "kind": "drive#fileList",
  "etag": etag,
  "selfLink": string,
  "nextPageToken": string,
  "nextLink": string,
  "items": [
    files Resource https://developers.google.com/drive/v2/reference/files
  ]
}
 */
Drive.prototype.listAllFiles = function listAllFiles()
{
	var query = encodeURIComponent("mimeType!='application/vnd.google-apps.folder'");
	return this.myTools.send('GET', 'files?q='+ query );
};

/**
 * Moves a file to the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.trashFile = function trashFile(fileId)
{
	return this.myTools.send('POST', 'files/'+ fileId +'/trash');
};

/**
 * Restores a file from the trash.
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.untrashFile = function untrashFile(fileId)
{
	return this.myTools.send('POST', 'files/'+ fileId +'/untrash');	
};

/**
 * Permanently deletes all of the user's trashed files.
 */
Drive.prototype.emptyTrash = function emptyTrash()
{
	return this.myTools.send('DELETE', 'files/trash');
};

/**
 * Rename a file. Keep the same file extension.
 * 
 * @param {string} fileId - Google Drive file ID
 * @param {string} fileName - The new file name to apply
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.renameFile = function renameFile(fileId, fileName)
{
	var requestBody = {'title': decodeURIComponent(fileName)};
	return this.myTools.send('PUT', 'files/'+ fileId, requestBody);
};

/**
 * Create an empty file.
 * 
 * @param {string} [fileName] - [optional] Google Drive file name (ex: fibonacci.js). Default: 'Untitled' 
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.createFile = function createFile(fileName, folderId)
{
	var requestBody = {};
	if (fileName)
		requestBody.title = decodeURIComponent(fileName);
	if (folderId)
		requestBody.parents = [{'id': decodeURIComponent(folderId)}];
		
	return this.myTools.send('POST', 'files', requestBody);
};

/**
 * Move a file into a folder.
 * 
 * @param {string} fileId - Google Drive file id
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.moveFile = function moveFile(fileId, folderId)
{
	folderId = folderId ? folderId : 'root';
	var requestBody = { 'parents': [ {'id': decodeURIComponent(folderId)} ]};
	return this.myTools.send('PUT', 'files/'+fileId, requestBody);
};

/**
 * Lists the user's folders.
 * 
 * @return {Object} {
  "kind": "drive#fileList",
  "etag": etag,
  "selfLink": string,
  "nextPageToken": string,
  "nextLink": string,
  "items": [
    files Resource https://developers.google.com/drive/v2/reference/files
  ]
}
 */
Drive.prototype.listAllFolders = function listAllFolders()
{
	var query = encodeURIComponent("mimeType='application/vnd.google-apps.folder'");
	return this.myTools.send('GET', 'files?q='+ query );
};

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} {
  "kind": "drive#childList",
  "etag": etag,
  "selfLink": string,
  "nextPageToken": string,
  "nextLink": string,
  "items": [
    children Resource https://developers.google.com/drive/v2/reference/children#resource
  ]
}
 */
Drive.prototype.listElementsInFolder = function listElementsInFolder(folderId)
{
	folderId = folderId ? folderId : 'root';
	return this.myTools.send('GET', 'files/'+ folderId +'/children');
};

/**
 * List all elements (file or folder) in a folder.
 * 
 * @param {string} folderName - Google Drive folder name
 * @param {string} [folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.createFolder = function createFolder(folderName, folderId)
{
	var requestBody = {
		'title': decodeURIComponent(folderName),
		'mimeType': 'application/vnd.google-apps.folder'
	};
	if (folderId)
		requestBody.parents = [{'id': decodeURIComponent(folderId)}];
		
	return this.myTools.send('POST', 'files', requestBody);
};

/**
 * Gets a file's metadata by ID. No extension or it will be consider as a file.
 * 
 * @param {string} folderId - Google Drive folder ID
 * @param {string} folderName - The new folder name to apply
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.renameFolder = function renameFolder(folderId, folderName)
{
	var requestBody = {'title': decodeURIComponent(folderName)};
	return this.myTools.send('PUT', 'files/'+ folderId, requestBody);
};

/**
 * Permanently deletes a folder by its ID and all its content (files and folders). Skips the trash. The currently authenticated user must own the file.
 * 
 * @param {string} folderId - Google Drive folder ID
 */
Drive.prototype.deleteFolder = function deleteFolder(folderId)
{
	return this.myTools.send('DELETE', 'files/'+ folderId );	
};

/**
 * Moves a folder to the trash.
 * 
 * @param {string} folderId - Google Drive folder ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.trashFolder = function trashFolder(folderId)
{
	return this.myTools.send('POST', 'files/'+ folderId +'/trash');
};

/**
 * Restores a folder from the trash.
 * 
 * @param {string} folderId - Google Drive folder ID
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.untrashFolder = function untrashFolder(folderId)
{
	return this.myTools.send('POST', 'files/'+ folderId +'/untrash');	
};