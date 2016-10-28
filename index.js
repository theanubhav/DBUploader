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
    //sample Status
    // status = { status: 0,
    // fileName: 'providers-2016-8-25_11-54-21.zip',
    // filePath: 'E:\\Projects\\raysources\\poc\\DB_Uploader\\providers-2016-8-25_11-54-21.zip' }
    storageProvider.init(DB_accessToken,DB_folderName);
    storageProvider.uploadFile(status.filePath).then((response)=>{

      //delete after
      fs.unlinkSync(status.filePath)
      console.log("Successfully uploaded to", response.path_display);
      //console.log(response);
      //console.log('All Done');
    });
 })
