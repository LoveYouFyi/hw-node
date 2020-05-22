const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeCSV = (data, name) => {
  const csvWriter = createCsvWriter({
    path: `./parsed-files/${name}.csv`,
    header: [
      {id: 'user_id', title: 'user_id'},
      {id: 'first_name', title: 'first_name'},
      {id: 'last_name', title: 'last_name'},
      {id: 'version', title: 'version'},
      {id: 'insurance_company', title: 'insurance_company'},
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));
}

const distinctCompanyNames = (array, propType) => [...new Set(array.map(prop => prop[propType]))];

const distinctCompanyRows = (array, name) => array.filter(row => row.insurance_company === name);

const sortByLastThenFirstName = (array) => array.sort((a, b) => {
  const fullName = e => `${e['last_name']} " " ${e['first_name']}`;

  const valueA = fullName(a).toUpperCase();
  const valueB = fullName(b).toUpperCase();

  if (valueA > valueB ) return 1;
  if (valueA < valueB) return -1;
  return 0; // if equal
});

////////////////////////////////////////////////////////////////////////////////
// Duplicates Removal
//
const duplicatesFlagLowVersionToRemove = (array, indexesToRemove) => {
  const indexesRemove = [];

  array.sort((a, b) => {

    if (a.user_id === b.user_id) {
      if (a.version <= b.version) {
        const indexA = array.indexOf(a);
//        console.log("a: ", indexA, a)
        indexesRemove.push(indexA);
      }
      if (a.version >= b.version) {
        const indexB = array.indexOf(b);
//        console.log("b: ", indexB, b)
        indexesRemove.push(indexB);
      }
    }

  });
//  console.log("indexexRemove 4444444444444444444444444 ", indexesRemove);
  return indexesRemove;
}

//const arrayRemoveDuplicates = (arrayToMap, arrayToTrim) => arrayToMap.map((e) => {
  //return arrayToTrim.splice(e, 1);
//});

const newData = (array, removeValFrom) => array.filter(function(value, index) {
  return removeValFrom.indexOf(index) == -1;
});
//
// Duplicates Removal
////////////////////////////////////////////////////////////////////////////////


const rowsByCompany = (data) => 
  distinctCompanyNames(data, 'insurance_company').map(name => {
//    const indexesToRemove = [];
    const filtered = distinctCompanyRows(data, name);
    const sorted = sortByLastThenFirstName(filtered);
    const indexesToRemove = duplicatesFlagLowVersionToRemove(sorted);
    console.log("indexesToRemove: ", indexesToRemove);
//    const removed = arrayRemoveDuplicates(indexesToRemove, sorted);
//    console.log("removed: %%%%%%%%%%%%%%%%% ", removed);
//    console.log("sorted: ", sorted);
    const final = newData(sorted, indexesToRemove);
    console.log("final $$$$$$$$$$$$$$$$$$ ", final);
    return writeCSV(final, name);
  });

exports.parse = rowsByCompany;

