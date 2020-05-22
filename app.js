const fs = require('fs');
const csvParser = require('csv-parser');
const appUtility = require('./app-utility');
// files
const file = './parseme.csv'


//let writeStream = company => fs.createWriteStream(`${company}.txt`);
let data = [];

fs.createReadStream(file)
  // checks for potential file errors before reading
  .on('err', () => {
    console.error("File error!");
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
//    console.log(data)
    console.log(appUtility.parse(data));
    appUtility.parse(data);
  })

//  .pipe(writeStream)

/*
// write data
writeStream.write('wreitre8refr8ej8f4j38f4j83jf43jfdiajwea');
// finish event emitted once all data written from stream
writeStream.on('finish', () => {
  console.log('Finished Write!');
});


// close stream / ends processing
writeStream.end();
*/
