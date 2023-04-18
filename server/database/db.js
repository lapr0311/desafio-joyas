const { Pool } = require('pg')
const {db} = require ("../database/config")


const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port:db.port,
    allowExitOnIdle: true
    })
    module.exports = pool;
   
