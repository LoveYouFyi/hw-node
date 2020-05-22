
## Nodejs Application that Parses CSV files using Streams

Designed for parsing enrollment files of CSV format with fields:

* user_id
* first_name
* last_name
* version
* insurance_company

## Parsing Activities Described

Reads files and separates data into new files by insurance company name.

Files are sorted by last, and first names.

Where duplicate user_id's are found, the record with the highest 'version' number is retained, the others are removed.  

Each insurance company from the source CSV is saved separately into its own file.

## How to Process Files

1. Requires you have Nodejs installed, version 8 and up should be fine.

1. From the project root, install node modules by running `npm install`

1. Add your CSV files to the directory `/parse-these-files`

1. From the project directory run one of the following commands:

* `node app.js`

* `npm run start`

1. You should see log messages indicating that the files are being read, after which they get parsed, and once that is done you will see log messages as the new files are being written.