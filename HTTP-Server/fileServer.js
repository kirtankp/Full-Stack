/*
    The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404
*/

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const getFiles = (req, res) => {
  const directoryPath = path.join(__dirname, 'files');
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      res.status(500).send('Files not retrived');
    }
    res.status(200).json(files);
  });
}
app.get('/files/', getFiles);

const fileContent = (req, res) => {
  const fileName = req.params.filename;
  fs.readFile(`./files/${fileName}`, 'utf8', function (err, data) {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.status(200).send(data);
    }
  });
}
app.get('/file/:filename', fileContent);

const otherRoute = (req, res, next) => {
  res.status(404).send('Route not found');
}
app.use(otherRoute);

app.listen(3001, () => {
  console.log('app is started on port-3001');
});
