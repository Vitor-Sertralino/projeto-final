import { pool } from '../db.js';

export const getLivros = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT l.*, a.nome AS autor, c.nome AS classificacao
    FROM livros l
    JOIN autores a ON l.id_autor = a.id
    JOIN classificacoes c ON l.id_classificacao = c.id
  `);
  res.json(rows);
};

export const getLivroById = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM livros WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

export const createLivro = async (req, res) => {
  const { titulo, ano_publicacao, id_autor, id_classificacao } = req.body;
  const [result] = await pool.query(
    'INSERT INTO livros (titulo, ano_publicacao, id_autor, id_classificacao) VALUES (?, ?, ?, ?, ?)',
    [titulo, ano_publicacao, id_autor, id_classificacao]
  );
  res.status(201).json({ id: result.insertId });
};

export const updateLivro = async (req, res) => {
  const { titulo, ano_publicacao, isbn, id_autor, id_classificacao } = req.body;
  await pool.query(
    'UPDATE livros SET titulo = ?, ano_publicacao = ?, id_autor = ?, id_classificacao = ? WHERE id = ?',
    [titulo, ano_publicacao, id_autor, id_classificacao, req.params.id]
  );
  res.sendStatus(204);
};

export const deleteLivro = async (req, res) => {
  await pool.query('DELETE FROM livros WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
