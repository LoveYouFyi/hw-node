const fs = require('fs');
const csvParser = require('csv-parser'); // converts to objects
const path = require('path');
const directoryPath = path.join(__dirname, 'parse-these-files');
// app-specific 
const appUtility = require('./app-utility');

// Call for reach file that is to be processed
// Reads from ./parse-these-files 
// Writes to ./parsed-files
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

fs.readdir(directoryPath, (err, files) => {
  //handle error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  // Read and Write each file
  files.forEach(file => {
    console.log(file); 
    readAndWrite(file);
  });
});

