const express = require('express');
const router = express.Router();
const autoresController = require('../controllers/autores.controller');

router.get('/', autoresController.getAutores);
router.get('/:id', autoresController.getAutorById);
router.post('/', autoresController.createAutor);
router.put('/:id', autoresController.updateAutor);
router.delete('/:id', autoresController.deleteAutor);

module.exports = router;
