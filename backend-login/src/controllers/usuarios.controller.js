import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST /api/usuarios
export async function criarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    }

    const [existe] = await pool.query("SELECT id FROM usuarios WHERE email = ? LIMIT 1", [email]);
    if (existe.length) return res.status(409).json({ message: "E-mail já cadastrado." });

    const hash = await bcrypt.hash(senha, 10);
    const [r] = await pool.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, hash]
    );
    res.status(201).json({ id: r.insertId, nome, email });
  } catch (e) {
    console.error("criarUsuario:", e);
    res.status(500).json({ message: "Erro interno ao cadastrar." });
  }
}

// POST /api/login
export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios." });

    const [rows] = await pool.query(
      "SELECT id, nome, email, senha_hash FROM usuarios WHERE email = ? LIMIT 1",
      [email]
    );
    if (!rows.length) return res.status(401).json({ message: "Credenciais inválidas." });

    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha_hash);
    if (!ok) return res.status(401).json({ message: "Credenciais inválidas." });

    const token = jwt.sign(
      { sub: user.id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "15m" }
    );

    res.json({ token, usuario: { id: user.id, nome: user.nome, email: user.email } });
  } catch (e) {
    console.error("login:", e);
    res.status(500).json({ message: "Erro interno no login." });
  }
}

// GET /api/usuarios (protegida)
export async function listarUsuarios(_req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nome, email, criado_em FROM usuarios ORDER BY id DESC"
    );
    res.json(rows);
  } catch (e) {
    console.error("listarUsuarios:", e);
    res.status(500).json({ message: "Erro ao listar." });
  }
}

// Middleware
export function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Token ausente." });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
