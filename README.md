# wakanda-googledrive-api

A SSJS module for wakanda which provides a Google Drive connector through SSJS APIs. This module requires `wakanda-oauth2` for authentification.

##How To

1- Copy all files in `Modules/googledrive-api` folder.
2- In a SSJS file (ex: `test.js`), add:

```javascript
var drive = require('googledrive-api');
drive.setAccessToken('my oauth2 access_token retrieved using the wakanda-oauth2 modules');
drive.files.listFiles();
```
