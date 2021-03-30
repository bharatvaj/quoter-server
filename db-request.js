const { Pool, Client } = require('pg')
const orm = require('./orm');

var pool = null;

function init() {
    pool = new Pool();
}

function getQuotes(tags) {
    return new Promise((resolve, reject) => {
        pool.query(` select * from quoter.quotes where tags @> '{${tags}}'`, (err, dbResult) => {
            if (err) {
                reject(err);
            } else if (dbResult) {
                return resolve(orm.getQuotes(dbResult.rows));
            } else {
                reject(err);
            }
        });
    });
}

function close() {
    if (pool) {
        pool.end();
    }
}



module.exports = {
    init,
    getQuotes,
    close
};