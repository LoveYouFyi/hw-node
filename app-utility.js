
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
const duplicatesFlagLowVersionToRemove = (array, removeList) => array.sort((a, b) => {
  if (a.user_id === b.user_id) {
    if (a.version <= b.version) {
      const indexA = array.indexOf(a);
      removeList.push(indexA);
    }
    if (a.version >= b.version) {
      const indexB = array.indexOf(b);
      removeList.push(indexB);
    }
  }
});

const arrayRemoveDuplicates = (arrayToMap, arrayToTrim) => arrayToMap.map((e) => {
  return arrayToTrim.splice(e, 1);
});
//
// Duplicates Removal
////////////////////////////////////////////////////////////////////////////////

const rowsByCompany = array => distinctCompanyNames(array, 'insurance_company').map(name => {
  const indexeTheseve = [];
  const filtered = distinctCompanyRows(array, name);
  const sorted = sortByLastThenFirstName(filtered);
  duplicatesFlagLowVersionToRemove(sorted, indexeTheseve);
  arrayRemoveDuplicates(indexeTheseve, sorted);
  return sorted;
});

exports.parse = rowsByCompany;

