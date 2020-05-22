
## Nodejs Application that Reads and Writes CSV files as Streams

Designed for parsing enrollment files of standard format:

* user_id
* first_name
* last_name
* version
* insurance_company

## Parsing Activities Described

Reads files and separates data into new files by insurance company name.

Files are sorted by last, and first names.

Where duplicate user_id's are found, the record with the highest 'version' number is retained, the others are removed.  

Each insurance company from the source CSV is saved separately into its own file