const db = require('../db');

exports.getAutores = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM autores');
  res.json(rows);
};

exports.getAutorById = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM autores WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

exports.createAutor = async (req, res) => {
  const { nome, data_nascimento, nacionalidade } = req.body;
  const [result] = await db.query(
    'INSERT INTO autores (nome, data_nascimento, nacionalidade) VALUES (?, ?, ?)',
    [nome, data_nascimento, nacionalidade]
  );
  res.status(201).json({ id: result.insertId });
};

exports.updateAutor = async (req, res) => {
  const { nome, data_nascimento, nacionalidade } = req.body;
  await db.query(
    'UPDATE autores SET nome = ?, data_nascimento = ?, nacionalidade = ? WHERE id = ?',
    [nome, data_nascimento, nacionalidade, req.params.id]
  );
  res.sendStatus(204);
};

exports.deleteAutor = async (req, res) => {
  await db.query('DELETE FROM autores WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
