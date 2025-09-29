import { useEffect, useState } from "react";
import "./CrudLivros.css";

const API_LIVROS = "http://localhost:4000/api/livros";
const API_GEN = "http://localhost:4000/api/classificacoes";
const API_AUTORES = "http://localhost:4000/api/autores";

export default function CrudClassificacoes() {
  const [lista, setLista] = useState([]);
  const [classificacoes, setClassificacoes] = useState([])
  const [autores, setAutores] = useState([])
  const [form, setForm] = useState({
    id: null,
    titulo: "",
    ano_publicacao: "",
    id_autor: "",
    id_classificacao: "",
  });

  const emEdicao = form.id !== null;

  // Carregar lista inicial da API
  useEffect(() => {
    carregarLivros();
    carregarClassificacoes();
    carregarAutores();
  }, []);

  async function carregarLivros() {
    const res = await fetch(API_LIVROS);
    const dados = await res.json();
    setLista(dados || []);
  }

  async function carregarClassificacoes() {
    const res = await fetch(API_GEN);
    const dados = await res.json();
    setClassificacoes(dados || []);
  }

  async function carregarAutores() {
    const res = await fetch(API_AUTORES);
    const dados = await res.json();

    console.log(dados)
    setAutores(dados || []);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({ id: null, titulo: "", ano_publicacao: "", id_autor: "", id_classificacao: "" });
  }

  async function criarLivro() {
    if (!form.titulo.trim()) {
      alert("Campo vazio.")
    }

    const res = await fetch(API_LIVROS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: form.titulo,
        ano_publicacao: form.ano_publicacao,
        id_autor: Number(form.id_autor),
        id_classificacao: Number(form.id_classificacao),
      }),
    });
    const novo = await res.json();
    setLista((antiga) => [novo, ...antiga]);
    limparForm();
  }

  async function atualizarLivro() {
    if (!form.titulo.trim()) {
      alert("Campo vazio.")
    }

    const res = await fetch(`${API_LIVROS}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: form.titulo,
        ano_publicacao: form.ano_publicacao,
        id_autor: form.id_autor ? Number(form.id_autor) : null,
        id_classificacao: form.id_classificacao ? Number(form.id_classificacao) : null,
      }),
    });
    const atualizado = await res.json();

    setLista((itens) =>
      itens.map((a) => (a.id === atualizado.id ? atualizado : a))
    );
    limparForm();
  }

  async function removerLivro(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover este livro?");
    if (!confirmar) return;

    await fetch(`${API_LIVROS}/${id}`, { method: "DELETE" });
    setLista((itens) => itens.filter((a) => a.id !== id));
  }

  function iniciarEdicao(livro) {
    setForm(livro);
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarLivro();
    else criarLivro();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Livros</h2>
      <p className="crud__subtitle">Manejo de Livros consumindo banco de dados.</p>

      {/* FORMULÁRIO */}
      <form onSubmit={onSubmit} className="crud__form">
        <div className="form-row">
          <div className="form-field">
            <label className="label">Título</label>
            <input
              className="input"
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ex.: 1984"
            />
          </div>

          <div className="form-field">
            <label className="label">Ano de Publicação</label>
            <input
              className="input"
              type="number"
              name="ano_publicacao"
              value={form.ano_publicacao}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label className="label">Autor</label>
            <select
              className="input"
              name="id_autor"
              value={form.id_autor}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {autores.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="label">Classificação</label>
            <select
              className="input"
              name="id_classificacao"
              value={form.id_classificacao}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {classificacoes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
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
            <th className="th">Título</th>
            <th className="th">Ano publicacao</th>
            <th className="th">Autor</th>
            <th className="th">Classificação</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={3}>— Nenhum livro cadastrado —</td>
            </tr>
          ) : (
            lista.map((a) => (
              <tr key={a.id}>
                <td className="td">{a.titulo}</td>
                <td className="td">{a.ano_publicacao}</td>
                <td className="td">{a.autor}</td>
                <td className="td">{a.classificacao}</td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(a)}>Editar</button>
                    <button className="btn btn-small" onClick={() => removerLivro(a.id)}>Remover</button>
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
