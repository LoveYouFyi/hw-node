const fs = require('fs');
const csvParser = require('csv-parser'); // converts to objects
const appUtility = require('./app-utility');

//
// Parse this file
//
const file = './parseme.csv'

// accumulate stream here
const data = [];

fs.createReadStream(file)
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
