const fs = require('fs');
const csvParser = require('csv-parser');

// file to parse 
const file = './parseme.csv'

// filestream access readstream object
fs.createReadStream(file)
  // checks for potential file errors before reading
  .on('err', () => {
    // handle error
    console.error("File error!");
  })
  // pipe data into steam reading
  .pipe(csvParser())
  // reads each row individually 
  .on('data', row => {
    // use row data
      console.log(row);
  })

  .on('end', () => {
    // handle end of CSV
    console.log("Finished!");
  })
