const fs = require('fs');
const csvParser = require('csv-parser'); // converts to objects
const appUtility = require('./app-utility');

const path = require('path');
// join path of directory 
const directoryPath = path.join(__dirname, 'parse-these-files');
// pass directoryPath and callback function

const readAndWrite = file => {

  const parseFile = `./parse-these-files/${file}`;

  // accumulate stream here
  const data = [];

  fs.createReadStream(parseFile)
    // checks for potential file errors before reading
    .on('err', (error) => {
      console.error("File error!", error);
    })
    // pipe data into steam reading
    .pipe(csvParser())
    // reads each row individually 
    .on('data', row => {
      data.push(row)
    })
    // once read finished
    .on('end', () => {
      console.log("Finished Read!");
      appUtility.parse(data);
    })
}

fs.readdir(directoryPath, function (err, files) {
  //handle error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  // listing all files using forEach
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    console.log(file); 
    readAndWrite(file);
  });
});

