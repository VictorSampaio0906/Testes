// Pega o nome da URL
const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");

if (nome) {
  document.getElementById("nomeUsuario").textContent = nome;
}
