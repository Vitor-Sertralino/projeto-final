import { pool } from '../db.js';

export const getClassificacoes = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM classificacoes');
  res.json(rows);
};

export const getClassificacaoById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM classificacoes WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

export const createClassificacao = async (req, res) => {
  const { nome, descricao } = req.body;
  const [result] = await pool.query(
    'INSERT INTO classificacoes (nome, descricao) VALUES (?, ?)',
    [nome, descricao]
  );
  res.status(201).json({ id: result.insertId });
};

export const updateClassificacao = async (req, res) => {
  const { nome, descricao } = req.body;
  await pool.query(
    'UPDATE classificacoes SET nome = ?, descricao = ? WHERE id = ?',
    [nome, descricao, req.params.id]
  );
  res.sendStatus(204);
};

export const deleteClassificacao = async (req, res) => {
  await pool.query('DELETE FROM classificacoes WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
