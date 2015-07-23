# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs.
This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.
2- In a SSJS file (ex: `test.js`), add:

```javascript
var drive = require('googledrive-api');

// Set the access_token given by "wakanda_oauth2" module
drive.setAccessToken('ya29.uQE7Wc3aVPzfAJ9Poqgh4xvCvwHsZCiSBttMwemF-NpkkAWt-LVjziLpvqVGG5PClTM8_g');
drive.listAllFiles();

// Get a specific file metadata 
drive.getFile('19KWpbnlNjZywD2QPugg1Z80oiVw0V4nIqZYXDKTkHT0');

// Copy a specific file
var myCopy = drive.copyFile('19KWpbnlNjZywD2QPugg1Z80oiVw0V4nIqZYXDKTkHT0');

// Delete a specific file
drive.deleteFile(myCopy.id);

myCopy = drive.copyFile('19KWpbnlNjZywD2QPugg1Z80oiVw0V4nIqZYXDKTkHT0');
// Trash/untrash a file
drive.trashFile(myCopy.id);
drive.untrashFile(myCopy.id);

// Trash a file then empty the trash. Equivalent to deleteFile()
drive.trashFile(myCopy.id);
drive.emptyTrash();
```
