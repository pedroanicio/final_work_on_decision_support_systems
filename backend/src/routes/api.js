const express = require('express');
const router = express.Router();
const { diagnose } = require('../diagnose'); 


router.post('/diagnostico', diagnose);

module.exports = router; // exportação correta do router
