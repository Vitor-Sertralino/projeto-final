import { useEffect, useState } from "react";
import "./CrudAutores.css";

const API = "http://localhost:4000/api/autores";

export default function CrudAutores() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    nacionalidade: "",
  });

  const emEdicao = form.id !== null;

  // Carregar lista inicial da API
  useEffect(() => {
    async function carregarAutores() {
      const res = await fetch(API);
      const dados = await res.json();
      setLista(dados || []);
    }
    carregarAutores();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({ id: null, nome: "", nacionalidade: "" });
  }

  async function criarAutor() {
    if (!form.nome.trim()) {
      alert("Por favor, digite um nome.")
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        nacionalidade: form.nacionalidade,
      }),
    });
    const novo = await res.json();
    console.log(novo)
    setLista((antiga) => [novo, ...antiga]);
    limparForm();
  }

  async function atualizarAutor() {
    if (!form.nome.trim()) {
      alert("Por favor, digite um nome.")
    }

    const res = await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        nacionalidade: form.nacionalidade,
      }),
    });
    const atualizado = await res.json();

    setLista((itens) =>
      itens.map((a) => (a.id === atualizado.id ? atualizado : a))
    );
    limparForm();
  }

  async function removerAutor(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover este autor?");
    if (!confirmar) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setLista((itens) => itens.filter((a) => a.id !== id));
  }

  function iniciarEdicao(autor) {
    setForm(autor);
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarAutor();
    else criarAutor();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Autores</h2>
      <p className="crud__subtitle">Manejo de Autores consumindo banco de dados.</p>

      {/* FORMULÁRIO */}
      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex.: Machado de Assis"
            />
          </div>

          <div className="form-field">
            <label className="label">Nacionalidade</label>
            <input
              className="input"
              type="text"
              name="nacionalidade"
              value={form.nacionalidade}
              onChange={handleChange}
              placeholder="Ex.: Brasileiro"
            />
          </div>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {emEdicao ? "Atualizar" : "Adicionar"}
          </button>
          <button type="button" onClick={limparForm} className="btn btn-ghost">
            Limpar
          </button>
        </div>
      </form>

      {/* LISTA */}
      <table className="table">
        <thead>
          <tr>
            <th className="th">Nome</th>
            <th className="th">Nacionalidade</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={3}>— Nenhum autor cadastrado —</td>
            </tr>
          ) : (
            lista.map((a) => (
              <tr key={a.id}>
                <td className="td">{a.nome}</td>
                <td className="td">{a.nacionalidade}</td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(a)}>Editar</button>
                    <button className="btn btn-small" onClick={() => removerAutor(a.id)}>Remover</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
