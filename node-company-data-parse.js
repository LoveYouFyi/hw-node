
const data = 
  [
    {
      row: {
        user_id: 'mfattori0',
        first_name: 'Mariya',
        last_name: 'Fattori',
        version: '5',
        insurance_company: 'Ledner'
      }
    },
    {
      row: {
        user_id: 'kjeavons1',
        first_name: 'Kelsey',
        last_name: 'Jeavons',
        version: '9',
        insurance_company: 'Ledner'
      }
    },
    {
      row: {
        user_id: 'xfeldklein2',
        first_name: 'Xerxes',
        last_name: 'Feldklein',
        version: '5',
        insurance_company: 'Pfannerstill'
      }
    },
    {
      row: {
        user_id: 'jstannering3',
        first_name: 'Jed',
        last_name: 'Stannering',
        version: '6',
        insurance_company: 'Pfannerstill'
      }
    },
    {
      row: {
        user_id: 'aadderleyt',
        first_name: 'Abe',
        last_name: 'Adderley',
        version: '8',
        insurance_company: 'Weber-Bradtke'
      }
    },
    {
      row: {
        user_id: 'fjanicu',
        first_name: 'Free',
        last_name: 'Janic',
        version: '2',
        insurance_company: 'Weber-Bradtke'
      }
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
