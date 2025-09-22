import { Routes, Route } from "react-router-dom";
import ProtectRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";
import Alunos from "./pages/Alunos";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />

      <Route element={<ProtectRoute />}>
        <Route element={<Layout />}>
          <Route path="/alunos" element={<Alunos />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
