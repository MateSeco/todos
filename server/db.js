//set up connection between database and server

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432, 
  database: 'perntodo'
});

module.exports = pool