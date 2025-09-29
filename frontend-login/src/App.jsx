import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import Layout from "./components/Layout/Layout";
import Autores from "./pages/Autores";
import Classificacoes from "./pages/Classificacoes";
import Livros from "./pages/Livros";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />

      <Route element={<ProtectRoute />}>
        <Route element={<Layout />}>
          <Route path="/autores" element={<Autores/>} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/classificacoes" element={<Classificacoes/>} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/livros" element={<Livros/>} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
