import mysql from 'mysql';

export const db = mysql.createPool({
    host: '127.0.0.1',
    user:'root',
    password: 'longto2903',
    database: 'score_schema'
})
