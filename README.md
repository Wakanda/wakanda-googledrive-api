# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

## How To

1- Copy all files in `Modules/googledrive-api` folder.

2- Add in `/Modules/oauth2-provider-google/client.json` the scope `https://www.googleapis.com/auth/drive`

3- In a SSJS file (ex: `test.js`), add:

```javascript
// For test needs, it is possible to get an access_token through google playground: https://developers.google.com/oauthplayground/
// It is mandatory to create a google app before using google playground: https://console.developers.google.com/project/
var myAccessToken = 'ya29.vgEbLQ1r0sUK_2QwKW6W0Af9_YLon4HGFekL1g2htKbihz8bp36oSimHCQYaPjQGictt';

// Require the "googledrive-api" module
var Drive = require('wakanda-googledrive-api');
var myDrive = new Drive();

// Set the access_token given by "wakanda_oauth2" module
myDrive.setAccessToken(myAccessToken);

// List all files in google drive
var myAllFiles = myDrive.listAllFiles();
```

## Settings

You can customize some parameters in config.js:

```javascript
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

```

## API Examples

```javascript
// Create a new file
var myCreatedFile = myDrive.createFile({fileName: 'createdFile.js'});

// Get a file metadata 
var myGettedFile = myDrive.getFile(myCreatedFile.id);

// Rename a file
var myRenamedFile = myDrive.renameFile(myCreatedFile.id, 'renamedFile.js');

// Copy a specific file
var myCopiedFile = myDrive.copyFile(myCreatedFile.id);

// Delete a specific file
myDrive.deleteFile(myCopiedFile.id);

// Trash/untrash a file
myDrive.trashFile(myCreatedFile.id);
myDrive.untrashFile(myCreatedFile.id);

// Trash a file then empty the trash. Equivalent to deleteFile()
myDrive.trashFile(myCreatedFile.id);
myDrive.emptyTrash();

// List all elements
var myAllElementsInRoot = myDrive.listFilesInFolder();
var myAllElementsInFolder = myDrive.listFilesInFolder('0B4SscfHkBrxJZEtsaU90OGR1Qmc');

// Create a folder
var myCreatedFolderInRoot = myDrive.createFolder({folderName: 'createdFolder'});
var myCreatedFolderInFolder = myDrive.createFolder({folderName: 'createdFolder', folderId: myCreatedFolderInRoot.id});

// Rename a folder
var myRenamedFolder = myDrive.renameFolder(myCreatedFolderInRoot.id, 'renamedFolder');

// Move a file
var myCreatedFileInFolder = myDrive.createFile({fileName: 'movedFile.js', folderId: myRenamedFolder.id});
var myMovedFileInFolder = myDrive.moveFile(myCreatedFileInFolder.id, myCreatedFolderInFolder.id);
var myMovedFileInRoot = myDrive.moveFile(myCreatedFileInFolder.id);

// Trash/Untrash a folder
var myTrashedFolder = myDrive.trashFolder(myCreatedFolderInRoot.id);
var myUntrashedFolder = myDrive.untrashFolder(myTrashedFolder.id);

// Delete a folder
myDrive.deleteFolder(myRenamedFolder.id);

// Upload
var myFile = File('/PROJECT/upload/myImg.jpg');
myDrive.uploadFile(myFile);

// Download
myDrive.downloadFile(fileId);
```
