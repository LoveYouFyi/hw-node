const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const writeCSV = (data, name) => {
  const csvWriter = createCsvWriter({
    path: `./parsed-files/${name}.csv`,
    header: [
      {id: 'user_id', title: 'user_id'},
      {id: 'last_name', title: 'last_name'},
      {id: 'first_name', title: 'first_name'},
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
    const versionA = parseInt(a.version, 10);
    const versionB = parseInt(b.version, 10);

    if (a.user_id === b.user_id) {
      if (versionA <= versionB) {
        const indexA = array.indexOf(a);
//        console.log("a: ", indexA, a)
        indexesRemove.push(indexA);
      }
      if (versionA >= versionB) {
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
    const filtered = distinctCompanyRows(data, name);
    const sorted = sortByLastThenFirstName(filtered);
    const indexesToRemove = duplicatesFlagLowVersionToRemove(sorted);
    const parsedData = newData(sorted, indexesToRemove);
    const sortFinal = sortByLastThenFirstName(parsedData);
    return writeCSV(sortFinal, name);
  });

exports.parse = rowsByCompany;

