import express from "express";
import cors from "cors";
import "dotenv/config";

import usuariosRoutes from "./routes/usuarios.routes.js";       // novo
import autoresRoutes from "./routes/autores.routes.js";
import classificacoesRoutes from "./routes/classificacoes.routes.js";
import livrosRoutes from "./routes/livros.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", usuariosRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/classificacoes", classificacoesRoutes);
app.use("/api/livros", livrosRoutes);

app.get("/", (_req, res) => res.send("API ok"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
