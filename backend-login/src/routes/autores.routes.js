import express from 'express';
import {
  getAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
} from '../controllers/autores.controller.js';

const router = express.Router();

router.get('/', getAutores);
router.get('/:id', getAutorById);
router.post('/', createAutor);
router.put('/:id', updateAutor);
router.delete('/:id', deleteAutor);

export default router;
