const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./sintomas.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        db.run(`CREATE TABLE IF NOT EXISTS sintomas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )`, (err) => {
            if (err) console.error('Erro ao criar tabela:', err.message);
        });
    }
});

module.exports = db;