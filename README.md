DB-Uploader
=========

A small library providing utility methods to Upload a folder(zipped) to dropbox

## Usage

  node index.js

## Configuration

{
  "path": "providers",
  "DB_accessToken" : "fDDM4lV4TGMAAAAAAAAAMRSl7vb43WY2GE0u9SqEhWZz862PX73u3GCr_6PlEUuF",
  "DB_folderName" : "raysourcesDB"
}
 `path` - folder path to be backedup (relative or absolute)
 `DB_accessToken` - dropbox app access token.
 `DB_folderName` - foldername inside which zipped backup has to be saved.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

* 0.1.0 Initial release
