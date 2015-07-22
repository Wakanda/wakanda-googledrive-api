var core	= require('./index');

function send(method, url)
{
	var access_token = core.getAccessToken();
	var xhr = new XMLHttpRequest();
    xhr.open( method , url , false );
    xhr.setRequestHeader( 'Authorization' , 'Bearer '+ access_token);
    xhr.send();
	
	return JSON.parse( xhr.responseText );
}


exports.getFile = function getFile()
{
	
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

exports.deleteFile = function deleteFile()
{
	
}

exports.listFiles = function listFiles()
{
	return send('GET' , 'https://www.googleapis.com/drive/v2/files');
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
