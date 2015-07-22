var tools	= require('./tools');

/**
 * https://developers.google.com/drive/v2/reference/files/get
 */
exports.getFile = function getFile(fileId, optionalParams)
{
	return tools.send('GET' , 'https://www.googleapis.com/drive/v2/files/'+ fileId, optionalParams );
}

exports.insertFile = function insertFile()
{
	
}

exports.patchFile = function patchFile()
{
	
}

exports.updateFile = function updateFile()
{
	
}

exports.copyFile = function copyFile()
{
	
}

exports.deleteFile = function deleteFile(fileId)
{
	return tools.send('DELETE' , 'https://www.googleapis.com/drive/v2/files/'+ fileId );	
}

/**
 * https://developers.google.com/drive/v2/reference/files/list
 */
exports.listFiles = function listFiles(optionalParams)
{
	return tools.send('GET' , 'https://www.googleapis.com/drive/v2/files', optionalParams );
}

exports.touchFile = function touchFile()
{
	
}

exports.trashFile = function trashFile()
{
	
}

exports.untrashFile = function untrashFile()
{
	
}

exports.watchFile = function watchFile()
{
	
}

exports.emptyTrash = function emptyTrash()
{
	
}
