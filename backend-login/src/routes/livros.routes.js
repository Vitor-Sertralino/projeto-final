// routes/livros.routes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/livros.controller');

router.get('/', ctrl.getLivros);
router.get('/:id', ctrl.getLivroById);
router.post('/', ctrl.createLivro);
router.put('/:id', ctrl.updateLivro);
router.delete('/:id', ctrl.deleteLivro);

module.exports = router;
