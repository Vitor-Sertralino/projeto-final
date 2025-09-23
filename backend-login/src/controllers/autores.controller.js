// controllers/autores.controller.js
import { pool } from '../db.js';

export const getAutores = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM autores');
  res.json(rows);
};

export const getAutorById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

export const createAutor = async (req, res) => {
  const { nome, nacionalidade } = req.body;
  const [result] = await pool.query(
    'INSERT INTO autores (nome, nacionalidade) VALUES (?, ?, ?)',
    [nome, nacionalidade]
  );
  res.status(201).json({ id: result.insertId });
};

export const updateAutor = async (req, res) => {
  const { nome, nacionalidade } = req.body;
  await pool.query(
    'UPDATE autores SET nome = ?, nacionalidade = ? WHERE id = ?',
    [nome, nacionalidade, req.params.id]
  );
  res.sendStatus(204);
};

export const deleteAutor = async (req, res) => {
  await pool.query('DELETE FROM autores WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
