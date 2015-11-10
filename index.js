var config = require( './config' );

/**
 * GoogleDrive constructor. Starting point to use the googleDrive API.
 */
var Drive = function()
{
	var Tools = require('./tools');
	this.myTools = new Tools('https://www.googleapis.com/drive/v2/', 'https://www.googleapis.com/upload/drive/v2/');
};
module.exports = Drive;

/**
 * Set the access_token retrieved from oauth2 authentification. Better for one shot or tests.
 * For long run, it's preferable to use useAccessTokenGetter() instead.
 * 
 * @param {string} [access_token] - [Optionnal] Set the access_token. If no parameters, then use config.js/getToken()
 */
Drive.prototype.setAccessToken = function setAccessToken(access_token)
{
	if (access_token)
		this.myTools.setAccessToken(access_token);
	else
		this.myTools.setAccessTokenGetter(config);
};

/**
 * Set the max_results. Number of files returned by Google Drive in one query
 * 
 * @param {number} max_results - Google Drive default is 100. Google Drive max is 1000.
 */
Drive.prototype.setMaxResults = function setMaxResults(max_results)
{
	this.max_results = max_results;
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
	query = query ? "mimeType!='application/vnd.google-apps.folder' and " + query : "mimeType!='application/vnd.google-apps.folder'";
	return this.myTools.send('GET', 'files?q='+ encodeURIComponent(query) );	
};

/**
 * Get first file/folder page.
 * Limited by Google Drive default is 100. Can be update by setMaxResults().
 * Use 'nextPageToken' returned and 'getNextElements()' for more files/folders.
 * 
 * @param {Object} [params] - [optional] 
 * @param {string} [params.folderId] - [optional] Google Drive folder id. Accepts 'root' as folderId.
 * @param {boolean} [params.onlyFiles] - [optional] Get only folder list
 * @param {boolean} [params.onlyFolders] - [optional] Get only file list.
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
Drive.prototype.getElements = function getElements(params)
{
	var url = 'files';
	var query = "";
	
	if (params)
	{
		if (params.onlyFiles)
		{
			query += query.length == 0 ? "" : " and ";
			query += "mimeType!='application/vnd.google-apps.folder'";
		}
		
		if (params.onlyFolders)
		{
			query += query.length == 0 ? "" : " and ";
			query += "mimeType='application/vnd.google-apps.folder'";
		}

		if (params.folderId)
		{
			query += query.length == 0 ? "" : " and ";
			query += "'"+ params.folderId +"' in parents";
		}
		
		url += '?q=' + encodeURIComponent(query);
		
		if (this.max_results)
		{
			url += '&maxResults=' + this.max_result;
		}
	}
	
	return this.myTools.send('GET', url);
};

/**
 * Get next file/folder page.
 * 
 * @param {string} nextPageToken - Google Drive nextPageToken
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
Drive.prototype.getNextElements = function getNextElements(nextPageToken)
{
	return this.myTools.send('GET', 'files?pageToken='+nextPageToken );
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
	return this.myTools.send('PUT', 'files/'+ fileId, {'body':requestBody});
};

/**
 * Create an empty file in root directory (default) or in another folder.
 * 
 * @param {Object} [params] - [optional]
 * @param {string} [params.fileName] - [optional] Google Drive file name (ex: fibonacci.js). Default: 'Untitled' 
 * @param {string} [params.folderId] - [optional] Google Drive folder id where add the file. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.createFile = function createFile(params)
{
	var requestBody = {};
	if (params)
	{
		if (params.fileName)
			requestBody.title = decodeURIComponent(params.fileName);
		if (params.folderId)
			requestBody.parents = [{'id': decodeURIComponent(params.folderId)}];
	}
	
	// Create an empty file
	return this.myTools.send('POST', 'files', {'body':requestBody});
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
	return this.myTools.send('PUT', 'files/'+fileId, {'body':requestBody});
};

/**
 * Search for one or some folders
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
Drive.prototype.queryFolder = function queryFile(query)
{
	query = query ? "mimeType='application/vnd.google-apps.folder' and " + query : "mimeType='application/vnd.google-apps.folder'";
	return this.myTools.send('GET', 'files?q='+ encodeURIComponent(query) );	
};

/**
 * Create a folder in root directory (default) or in another folder.
 * 
 * @param {Object} [params] - [optional]
 * @param {string} [params.folderName] - [optional] Google Drive folder name
 * @param {string} [params.folderId] - [optional] Google Drive folder id. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.createFolder = function createFolder(params)
{
	var requestBody = {
		'mimeType': 'application/vnd.google-apps.folder'
	};
	if (params)
	{
		if (params.folderName)
			requestBody.title = decodeURIComponent(params.folderName);
		if (params.folderId)
			requestBody.parents = [{'id': decodeURIComponent(params.folderId)}];
	}
	return this.myTools.send('POST', 'files', {'body':requestBody});
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
	return this.myTools.send('PUT', 'files/'+ folderId, {'body':requestBody});
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

/**
 * Download a file
 * 
 * @param {string} fileId - Google Drive file ID
 * @return {Object} File resource description
 */
Drive.prototype.downloadFile = function downloadFile(fileId)
{
	return this.myTools.send('GET', 'files/'+ fileId + '?alt=media', {binary:true});
};

/**
 * Upload a file.
 * 
 * @param {File} file - file to upload
 * @param {Object} [params] - [optional]
 * @param {string} [params.fileName] - [optional] Google Drive file name (ex: fibonacci.js). Default: 'Untitled' 
 * @param {string} [params.folderId] - [optional] Google Drive folder id where add the file. Default: 'root' 
 * @return {Object} File resource description - https://developers.google.com/drive/v2/reference/files
 */
Drive.prototype.uploadFile = function uploadFile(file, params)
{
	if (!file.exists)
		return {
			error: {
				code	: 'file_does_not_exist',
				message	: 'File does not exist or is not reachable by the systemFolder.'
			}
		};
	
	var requestBody = {};
	if (params)
	{
		if (params.fileName)
			requestBody.title = decodeURIComponent(params.fileName);
		if (params.folderId)
			requestBody.parents = [{'id': decodeURIComponent(params.folderId)}];
	}
	return this.myTools.upload('POST', 'files?uploadType=multipart', {'body': requestBody, 'file': file});
};
