const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes/api');
const sintomasRoutes = require('./routes/sintomas');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); 
app.use(morgan('combined')); 


app.use('/api', apiRoutes);
app.use('/sintomas', sintomasRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no servidor.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});