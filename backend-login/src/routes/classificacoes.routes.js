// routes/classificacoes.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/classificacoes.controller');

router.get('/', ctrl.getClassificacoes);
router.get('/:id', ctrl.getClassificacaoById);
router.post('/', ctrl.createClassificacao);
router.put('/:id', ctrl.updateClassificacao);
router.delete('/:id', ctrl.deleteClassificacao);

module.exports = router;
