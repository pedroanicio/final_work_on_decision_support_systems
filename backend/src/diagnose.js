const { exec } = require('child_process');

const diagnose = (req, res) => {
    const { sintomas } = req.body;

    if (!sintomas || typeof sintomas !== 'object') {
        return res.status(400).json({ error: 'Sintomas devem ser um objeto.' });
    }

    const sintomasJSON = JSON.stringify(sintomas);

    exec(`python3 ../python/id3.py '${sintomasJSON}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o script Python: ${stderr}`);
            return res.status(500).json({ error: 'Erro ao processar o diagnóstico.' });
        }

        const diagnostico = stdout.trim();
        if (!diagnostico) {
            return res.status(500).json({ error: 'Nenhum diagnóstico retornado.' });
        }
        res.json({ diagnostico });
    });
};

module.exports = { diagnose };
