const fs = require('fs');
const csvParser = require('csv-parser');

// file to parse 
const file = './parseme.csv'

//
// Read File
//
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
    console.log("Finished Read!");
  })


//
// Write File
//
let writeStream = fs.createWriteStream('company1.txt');

// write data
writeStream.write('wreitre8refr8ej8f4j38f4j83jf43jfdiajwea');

// finish event emitted once all data written from stream
writeStream.on('finish', () => {
    console.log('Finished Write!');
});

// close stream / ends processing
writeStream.end();
