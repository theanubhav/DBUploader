"use strict";
const config = require('./config.json'),
     pathAPI = require('path'),
     zipProvider = require('./providers/zipProvider'),
     storageProvider = require('./providers/storageProvider'),
     fs = require('fs');

let path = config.path;
let DB_accessToken = config.DB_accessToken;
let DB_folderName = config.DB_folderName;

if(!pathAPI.isAbsolute(path))
{
  path= pathAPI.join(__dirname,path)
}

zipProvider.zipFolder(path).then((status)=>{
    storageProvider.init(DB_accessToken,DB_folderName);
    storageProvider.uploadFile(status.filePath).then((response)=>{

      fs.unlinkSync(status.filePath)
      console.log("Successfully uploaded to", response.path_display);
    });
 })
