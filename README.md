# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.

2- In a SSJS file (ex: `test.js`), add:

```javascript
// For test needs, it is possible to get an access_token through google playground: https://developers.google.com/oauthplayground/
// It is mandatory to create a google app before using google playground: https://console.developers.google.com/project/
var myAccessToken = 'ya29.vgEbLQ1r0sUK_2QwKW6W0Af9_YLon4HGFekL1g2htKbihz8bp36oSimHCQYaPjQGictt';

// Require the "googledrive-api" module
var Drive = require('googledrive-api');
var myDrive = new Drive();

// Set the access_token given by "wakanda_oauth2" module
myDrive.setAccessToken(myAccessToken);

// List all files in google drive
var myAllFiles = myDrive.listAllFiles();

// Create a new file
var myCreatedFile = myDrive.createFile('createdFile.js');

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
var myAllElementsInRoot = myDrive.listElementsInFolder();
var myAllElementsInFolder = myDrive.listElementsInFolder('0B4SscfHkBrxJZEtsaU90OGR1Qmc');

// Create a folder
var myCreatedFolderInRoot = myDrive.createFolder('createdFolder');
var myCreatedFolderInFolder = myDrive.createFolder('createdFolder', myCreatedFolderInRoot.id);

// Rename a folder
var myRenamedFolder = myDrive.renameFolder(myCreatedFolderInRoot.id, 'renamedFolder');

// Move a file
var myCreatedFileInFolder = myDrive.createFile('movedFile.js', myRenamedFolder.id);
var myMovedFileInFolder = myDrive.moveFile(myCreatedFileInFolder.id, myCreatedFolderInFolder.id);
var myMovedFileInRoot = myDrive.moveFile(myCreatedFileInFolder.id);

// Trash/Untrash a folder
var myTrashedFolder = myDrive.trashFolder(myCreatedFolderInRoot.id);
var myUntrashedFolder = myDrive.untrashFolder(myTrashedFolder.id);

// Delete a folder
myDrive.deleteFolder(myRenamedFolder.id);
```
