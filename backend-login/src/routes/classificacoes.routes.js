import express from 'express';
import {
  getClassificacoes,
  getClassificacaoById,
  createClassificacao,
  updateClassificacao,
  deleteClassificacao
} from '../controllers/classificacoes.controller.js';

const router = express.Router();

router.get('/', getClassificacoes);
router.get('/:id', getClassificacaoById);
router.post('/', createClassificacao);
router.put('/:id', updateClassificacao);
router.delete('/:id', deleteClassificacao);

export default router;
