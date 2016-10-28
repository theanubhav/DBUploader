"use strict";
let EasyZip = require('easy-zip').EasyZip;
let fs =require('fs');
let pathAPI = require('path');
function FileOrFolderExists (path) {
  return new Promise(function(resolve,reject){
       fs.stat(path,(err, stats)=>{
         if(err)
          { reject(err)
          }
          resolve(stats)
       })
    });
}
function zipFolder (path) {
  return new Promise(function(resolve,reject){
  FileOrFolderExists(path).then(
    ()=>{
      let pathInfo = pathAPI.parse(path);
      //console.log(pathInfo);
      if(!(pathInfo.name && pathInfo.name.length))
      {
        reject(new Error('Not a valid path'))
      }

      let d = new Date();
      let dateString =d.getFullYear() + '-' + d.getMonth() +'-' + d.getDate() +"_" + d.getHours() +"-" + d.getMinutes() +"-" + d.getSeconds();
        let zipFolder = new EasyZip();
          zipFolder.zipFolder(path,function(){
            let fileName = `${pathInfo.name}-${dateString}.zip`;
            let filePath = pathAPI.join(pathInfo.dir,fileName);
              zipFolder.writeToFile(filePath,()=>{

                resolve({status:0, fileName: fileName, filePath: filePath});
              });
          });
    },
    (err)=>{
      reject(new Error(err));
    }
  )
  .catch(function(err) {
            reject(('Error :',err));
        })
  });
}
module.exports ={
  zipFolder,
  FileOrFolderExists
}
