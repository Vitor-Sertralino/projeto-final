import { useEffect, useState } from "react";
import "./CrudClassificacoes.css";

const API = "http://localhost:4000/api/classificacoes";

export default function CrudClassificacoes() {
  const [lista, setLista] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    descricao: "",
  });

  const emEdicao = form.id !== null;

  // Carregar lista inicial da API
  useEffect(() => {
    async function carregarClassificacoes() {
      const res = await fetch(API);
      const dados = await res.json();
      setLista(dados || []);
    }
    carregarClassificacoes();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function limparForm() {
    setForm({ id: null, nome: "", descricao: "" });
  }

  async function criarClassificacao() {
    if (!form.nome.trim()) {
      alert("Por favor, digite um nome.")
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        descricao: form.descricao,
      }),
    });
    const novo = await res.json();
    setLista((antiga) => [novo, ...antiga]);
    limparForm();
  }

  async function atualizarClassificacao() {
    if (!form.nome.trim()) {
      alert("Por favor, digite um nome.")
    }

    const res = await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        descricao: form.descricao,
      }),
    });
    const atualizado = await res.json();

    setLista((itens) =>
      itens.map((a) => (a.id === atualizado.id ? atualizado : a))
    );
    limparForm();
  }

  async function removerClassificacao(id) {
    const confirmar = window.confirm("Tem certeza que deseja remover esta classificação?");
    if (!confirmar) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    setLista((itens) => itens.filter((a) => a.id !== id));
  }

  function iniciarEdicao(classificacao) {
    setForm(classificacao);
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (emEdicao) atualizarClassificacao();
    else criarClassificacao();
  }

  return (
    <div className="card crud">
      <h2 className="crud__title">Gestão de Classificações</h2>
      <p className="crud__subtitle">Manejo de Classificações consumindo banco de dados.</p>

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
              placeholder="Ex.: Romance"
            />
          </div>

          <div className="form-field">
            <label className="label">Descrição</label>
            <input
              className="input"
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder=""
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
            <th className="th">Descrição</th>
            <th className="th">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td className="td" colSpan={3}>— Nenhuma classificação cadastrada —</td>
            </tr>
          ) : (
            lista.map((a) => (
              <tr key={a.id}>
                <td className="td">{a.nome}</td>
                <td className="td">{a.descricao}</td>
                <td className="td">
                  <div className="row-actions">
                    <button className="btn btn-small" onClick={() => iniciarEdicao(a)}>Editar</button>
                    <button className="btn btn-small" onClick={() => removerClassificacao(a.id)}>Remover</button>
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
