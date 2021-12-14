const mysql = require('mysql');
const { promisify } = require('util')


// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'db',
//     multipleStatements: true
// });

const databaseConfig = {
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db'
  }
  
  const pool = mysql.createPool(databaseConfig)
  const promiseQuery = promisify(pool.query).bind(pool)
  const promisePoolEnd = promisify(pool.end).bind(pool)
  

//   const query = `select * from mock_table limit 1;`
//   const result = await promiseQuery(query) // use in async function
  
//   promisePoolEnd()

module.exports = {promiseQuery, promisePoolEnd }


