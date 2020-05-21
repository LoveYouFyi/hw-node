
const data = 
  [
    {
      user_id: 'mfattori0',
      first_name: 'Mariya',
      last_name: 'Fattori',
      version: '5',
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
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '6',
      insurance_company: 'Pfannerstill'
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
      user_id: 'jmarlow9',
      first_name: 'Jewel',
      last_name: 'Marlow',
      version: '6',
      insurance_company: 'Orn'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '9',
      insurance_company: 'Orn'
    },
    {
      user_id: 'mpagden4',
      first_name: 'Miranda',
      last_name: 'Pagden',
      version: '4',
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

// argument 'propKey' value must be of type 'string' or 'number'
const sortObjectsAsc = (array, propKey) => array.sort((a, b) => {
  const value = val => typeof val === 'string' ? val.toUpperCase() : val;
  const valueA = value(a[propKey]);
  const valueB = value(b[propKey]);
  
  if (valueA > valueB ) return 1;
  if (valueA < valueB) return -1;
  return 0; // if equal
});

const objectValuesByKey = array => propKey => array.reduce((a, c) => {
  a.push(c[propKey]);
  return a;
}, []);

