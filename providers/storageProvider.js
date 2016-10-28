"use strict";
let fs =require('fs');
let pathAPI = require('path');
var Dropbox = require('dropbox');

let dbx = null;
let folderName = "raysourceBackup";

function init (accessToken, uploadfolderName) {
  dbx = new Dropbox({ accessToken: accessToken });
  folderName = uploadfolderName;
  return dbx.filesCreateFolder({path: '/'+folderName})
}

function getFolderContent () {
  return dbx.filesListFolder({path: '/'+folderName})
}

function uploadFile (filePath) {
  if(!dbx)
  {
    throw new Error('Initialize Provider first. Use init()')
  }
  let pathInfo = pathAPI.parse(filePath);
  var contents = fs.readFileSync(filePath)
  return dbx.filesUpload({path: '/'+folderName + '/'+ pathInfo.base , contents: contents})
}


module.exports ={
  init,
  uploadFile,
  getFolderContent
}
