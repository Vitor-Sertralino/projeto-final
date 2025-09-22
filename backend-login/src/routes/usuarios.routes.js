import { Router } from "express";
import { criarUsuario, login, listarUsuarios, auth } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/usuarios", criarUsuario);
router.post("/login", login);
router.get("/usuarios", auth, listarUsuarios);

export default router;
