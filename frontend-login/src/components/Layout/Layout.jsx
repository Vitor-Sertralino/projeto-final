import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useAuth } from "../../auth/AuthContext"

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/", { replace: true })
  }

  return (
    <div className="app">
      <aside className="sidebar">
      <h1 className="brand">Admin</h1>

      {user ? (
          <>
            <span className="greet">Olá, {user.nome}!</span>

        <nav className="nav">
          <NavLink to="/autores" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Autores
          </NavLink>
        </nav>
        <nav className="nav">
          <NavLink to="/classificacoes" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Classificações
          </NavLink>
        </nav>
        <nav className="nav">
          <NavLink to="/livros" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>
            Livros
          </NavLink>
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : null}
      </aside>

      <main className="content">
        <header className="header">
          <span>📚 Digi-Books — Painel Administrativo</span>
        </header>

        <section className="page">
          <Outlet />
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} DigiBooks
        </footer>
      </main>
    </div>
  );
}
