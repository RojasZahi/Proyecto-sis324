const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"" ,
            database:"basededatosmed",
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Conexión exitosa a la base de datos');
                    resolve();
                }
            });
        });
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Conexión cerrada');
                    resolve();
                }
            });
        });
    }
}

module.exports = Database;
