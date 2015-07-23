# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.

2- In a SSJS file (ex: `test.js`), add:

```javascript
var myAccessToken = 'ya29.uQEttXJ6-nl2OjIjO1BFA1cQXOaV5HCNfb29mmqU_ptYPSCtPVHaZnSD9VSonu6ButeH';
var myFileId = '19KWpbnlNjZywD2QPugg1Z80oiVw0V4nIqZYXDKTkHT0';

// Require the "googledrive-api" module
var drive = require('googledrive-api');

// Set the access_token given by "wakanda_oauth2" module
drive.setAccessToken(myAccessToken);

// List all files in google drive
drive.listAllFiles();

// Get a specific file metadata 
drive.getFile(myFileId);

// Copy a specific file
var myCopy = drive.copyFile(myFileId);

// Delete a specific file
drive.deleteFile(myCopy.id);

// Rename a file
myCopy = drive.copyFile(myFileId);
drive.renameFile(myCopy.id, 'toto');
drive.deleteFile(myCopy.id);

// Trash/untrash a file
myCopy = drive.copyFile(myFileId);
drive.trashFile(myCopy.id);
drive.untrashFile(myCopy.id);

// Trash a file then empty the trash. Equivalent to deleteFile()
drive.trashFile(myCopy.id);
drive.emptyTrash();
```
