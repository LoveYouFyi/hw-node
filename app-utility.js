// writes from object format to csv rows
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Unique insurance_company names from data rows (used for map argument)
const distinctCompanyNames = (array, propType) => [...new Set(array.map(prop => prop[propType]))];

// Rows belonging to one specific insurance_company (used for map argument) 
const distinctCompanyRows = (array, name) => array.filter(row => row.insurance_company === name);

// Sort rows by last name then first name, all to uppercase for true evaluation
const sortByLastThenFirstName = (array) => array.sort((a, b) => {
  const fullName = e => `${e['last_name']} " " ${e['first_name']}`;

  const valueA = fullName(a).toUpperCase();
  const valueB = fullName(b).toUpperCase();

  if (valueA > valueB ) return 1;
  if (valueA < valueB) return -1;
  return 0; // if equal
});

// Identify duplicates to be removed by array index
const duplicatesFlagLowVersionToRemove = (array) => {
  const indexesRemove = [];

  array.sort((a, b) => {
    const versionA = parseInt(a.version, 10);
    const versionB = parseInt(b.version, 10);

    if (a.user_id === b.user_id) {
      if (versionA <= versionB) {
        const indexA = array.indexOf(a);
        indexesRemove.push(indexA);
      }
      if (versionA >= versionB) {
        const indexB = array.indexOf(b);
        indexesRemove.push(indexB);
      }
    }

  });
  return indexesRemove;
}

// Return new array after removing duplicates by index
const dataDuplicatesRemoved = (array, removeValFrom) => array.filter(function(value, index) {
  return removeValFrom.indexOf(index) == -1;
});

// Write CSV files for data by company name
const writeCSV = (data, company) => {
  const csvWriter = createCsvWriter({
    path: `./parsed-files/${company}.csv`,
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

// Parse and Write by Company 
// for duplicate user_id keep only the one with highest version 
// sort by last name, first name 
const parseAndWriteByCompany = (data) => 
  distinctCompanyNames(data, 'insurance_company').map(company => {
    const filtered = distinctCompanyRows(data, company);
    const dataSortedOne = sortByLastThenFirstName(filtered);
    const indexesToRemove = duplicatesFlagLowVersionToRemove(dataSortedOne);
    const parsedData = dataDuplicatesRemoved(dataSortedOne, indexesToRemove);
    const dataSortedTwo = sortByLastThenFirstName(parsedData);
    return writeCSV(dataSortedTwo, company);
  });

exports.parse = parseAndWriteByCompany;

