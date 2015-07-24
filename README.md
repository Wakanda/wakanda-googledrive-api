# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.

2- In a SSJS file (ex: `test.js`), add:

```javascript
// For test needs, it is possible to get an access_token through google playground: https://developers.google.com/oauthplayground/
// It is mandatory to create a google app before using google playground: https://console.developers.google.com/project/
var myAccessToken = 'ya29.ugHQa7UHqTDTgiYlXIR6U4LwPS3O6s5COejguhX5V3bROS_gUPCzir5H1UjX33ModB3y';

// Require the "googledrive-api" module
var drive = require('googledrive-api');

// Set the access_token given by "wakanda_oauth2" module
drive.setAccessToken(myAccessToken);

// List all files in google drive
var myAllFiles = drive.listAllFiles();

// Create a new file
var myCreatedFile = drive.createFile('createdFile.js');

// Get a specific file metadata 
var myGettedFile = drive.getFile(myCreatedFile.id);

// Rename a file
var myRenamedFile = drive.renameFile(myCreatedFile.id, 'renamedFile.js');

// Copy a specific file
var myCopiedFile = drive.copyFile(myCreatedFile.id);

// Delete a specific file
drive.deleteFile(myCopiedFile.id);

// Trash/untrash a file
drive.trashFile(myCreatedFile.id);
drive.untrashFile(myCreatedFile.id);

// Trash a file then empty the trash. Equivalent to deleteFile()
drive.trashFile(myCreatedFile.id);
drive.emptyTrash();

// List all elements
var myAllElementsInRoot = drive.listElementsInFolder();
var myAllElementsInFolder = drive.listElementsInFolder('0B4SscfHkBrxJZEtsaU90OGR1Qmc');

// Create a folder
var myCreatedFolderInRoot = drive.createFolder('createdFolder');
var myCreatedFolderInFolder = drive.createFolder('createdFolder', myCreatedFolderInRoot.id);

// Rename a folder
var myRenamedFolder = drive.renameFolder(myCreatedFolderInRoot.id, 'renamedFolder');

// Delete a folder
drive.deleteFolder(myRenamedFolder.id);
```
