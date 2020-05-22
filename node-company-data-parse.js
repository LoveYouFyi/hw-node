
const data = 
  [
   {
      user_id: 'johnsmith',
      first_name: 'John',
      last_name: 'Smith',
      version: '9',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '4',
      insurance_company: 'Orn'
    },
    {
      user_id: 'jstea',
      first_name: 'Jane',
      last_name: 'Smith',
      version: '2',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'kjeavons1',
      first_name: 'Kelsey',
      last_name: 'Jeavons',
      version: '9',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '6',
      insurance_company: 'Pfannerstill'
    },
    {
      user_id: 'xfeldklein2',
      first_name: 'Xerxes',
      last_name: 'Feldklein',
      version: '5',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'xfeldklein2',
      first_name: 'Xerxes',
      last_name: 'Feldklein',
      version: '9',
      insurance_company: 'Ledner'
    },
   {
      user_id: 'cdrewe5',
      first_name: 'Cathy',
      last_name: 'Drewe',
      version: '7',
      insurance_company: 'Pfannerstill'
    },
    {
      user_id: 'hroose6',
      first_name: 'Harley',
      last_name: 'Roose',
      version: '3',
      insurance_company: 'Pfannerstill'
    },
    {
      user_id: 'mnursey7',
      first_name: 'Malissa',
      last_name: 'Nursey',
      version: '9',
      insurance_company: 'Pfannerstill'
    },
    {
      user_id: 'jellerey8',
      first_name: 'Jacquelin',
      last_name: 'Ellerey',
      version: '3',
      insurance_company: 'Orn'
    },
    {
      user_id: 'mfattori0',
      first_name: 'Mariya',
      last_name: 'Fattori',
      version: '5',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'jmarlow9',
      first_name: 'Jewel',
      last_name: 'Marlow',
      version: '6',
      insurance_company: 'Orn'
    },
    {
      user_id: 'jsmith',
      first_name: 'Jim',
      last_name: 'Smith',
      version: '5',
      insurance_company: 'Ledner'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '9',
      insurance_company: 'Orn'
    },
    {
      user_id: 'ageneryb',
      first_name: 'Alfy',
      last_name: 'Genery',
      version: '1',
      insurance_company: 'Orn'
    }
  ]

const duplicates = 
  [
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '8',
      insurance_company: 'Orn'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '6',
      insurance_company: 'Orn'
    },
    {
      user_id: 'jellerey8',
      first_name: 'Jacquelin',
      last_name: 'Ellerey',
      version: '3',
      insurance_company: 'Orn'
    },
    {
      user_id: 'jmarlow9',
      first_name: 'Jewel',
      last_name: 'Marlow',
      version: '6',
      insurance_company: 'Orn'
    }
  ]

const newArray = [];
const deDuped = (array) => array.sort((a, b) => {
  if (a.user_id === b.user_id 
    && a.version <= b.version) {
    console.log("a: ", array.indexOf(a));
    array.splice(array.indexOf(a));
  }
});


const sortByLastThenFirstName = (array) => array.sort((a, b) => {
  const fullName = e => `${e['last_name']} " " ${e['first_name']}`;

  const valueA = fullName(a).toUpperCase();
  const valueB = fullName(b).toUpperCase();

  if (valueA > valueB ) return 1;
  if (valueA < valueB) return -1;
  return 0; // if equal
});

const distinctCompanyNames = (array, propType) => [...new Set(array.map(prop => prop[propType]))];

const distinctCompanyRows = (array, name) => array.filter(row => row.insurance_company === name);

const rowsByCompany = distinctCompanyNames(duplicates, 'insurance_company').map(name => {
  const filtered = distinctCompanyRows(duplicates, name);
  const sorted = sortByLastThenFirstName(filtered);
  const deDu = deDuped(sorted);

  return deDu;
});

console.log("rowsByCompany: ", rowsByCompany);

