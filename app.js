const fs = require('fs');
const csvParser = require('csv-parser'); // converts to objects
const path = require('path');
const directoryPath = path.join(__dirname, 'parse-these-files');
// app-specific 
const appUtility = require('./app-utility');

//
// Run App: 
// $ cd to this directory 
// $ node app.js 

// Runs a file that is to be processed
// Reads from ./parse-these-files 
// Writes to ./parsed-files
const readAndWrite = file => {

  const readFile = `./parse-these-files/${file}`;

  // accumulate stream here
  const data = [];

  // run stream 
  fs.createReadStream(readFile)
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

// 
// For each .csv file in the 'parse-these-files' directory, call read/write
//
fs.readdir(directoryPath, (err, files) => {
  //handle error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  // Read and Write each file
  files.forEach(file => {
    // only call read/write for .csv files 
    const extRegex = /.csv$/;
    if (extRegex.test(file)) {
      console.log("ReadAndWrite requested: ", file); 
      readAndWrite(file);
    }
  });
});

