const express = require('express');
const db = require('../db/db');
const router = express.Router();

//validação de dados
const validarSintoma = (req, res, next) => {
    const { nome } = req.body;
    if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ error: 'O campo "nome" é obrigatório e deve ser uma string.' });
    }
    next();
};

router.get('/', (req, res) => {
    db.all('SELECT * FROM sintomas', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar sintomas.' });
        res.json(rows);
    });
});

router.post('/', validarSintoma, (req, res) => {
    const { nome } = req.body;
    db.run('INSERT INTO sintomas (nome) VALUES (?)', [nome], function (err) {
        if (err) return res.status(500).json({ error: 'Erro ao adicionar sintoma.' });
        res.json({ id: this.lastID, nome });
    });
});

router.put('/:id', validarSintoma, (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    db.run('UPDATE sintomas SET nome = ? WHERE id = ?', [nome, id], function (err) {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar sintoma.' });
        res.json({ message: 'Atualizado com sucesso' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });
    db.run('DELETE FROM sintomas WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: 'Erro ao excluir sintoma.' });
        res.json({ message: 'Sintoma removido' });
    });
});

module.exports = router;