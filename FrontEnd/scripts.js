const BASE_URL = "http://localhost:3001";

// ─── Cadastrar usuário ────────────────────────────────────
const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (evento) => {
  // Impede o comportamento padrão do form (recarregar a página)
  evento.preventDefault();

  // Coleta os dados dos inputs
  const dados = {
    Nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    age: document.getElementById("age").value,
  };

  try {
    // Envia os dados para o Node via POST
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados), // objeto JS → string JSON
    });

    const resultado = await response.json(); // string JSON → objeto JS

    if (!response.ok) {
      document.getElementById("mensagem").innerText = resultado.erro;
      return;
    }

    // Exibe mensagem de sucesso
    document.getElementById("mensagem").innerText =
      `✅ ${resultado.mensagem} — ID: ${resultado.id}`;

    // Limpa o formulário
    form.reset();

    // Atualiza a lista de usuários
    buscarUsuarios();
  } catch (erro) {
    document.getElementById("mensagem").innerText =
      "❌ Erro ao conectar com o servidor";
  }
});

// ─── Buscar e listar usuários ─────────────────────────────
async function buscarUsuarios() {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`);
    const usuarios = await response.json();

    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = ""; // limpa a lista antes de renderizar

    usuarios.forEach((usuario) => {
      const item = document.createElement("li");
      item.innerText = `${usuario.Nome} — ${usuario.email} — ${usuario.age} anos`;
      lista.appendChild(item);
    });
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);
  }
}

// Carrega os usuários quando a página abre
buscarUsuarios();
