# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.

2- In a SSJS file (ex: `test.js`), add:

```javascript
// For test needs, it is possible to get an access_token through google playground: https://developers.google.com/oauthplayground/
// It is mandatory to create a google app before using google playground: https://console.developers.google.com/project/
var myAccessToken = 'ya29.ugEBEbgx7sqj2ggxqq7GCqv5E329OADwfBPpjiJ7CgSzfbonRxihBgOvuLSLEgt_ArA2';

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
```
