const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");

if (nome) {
  document.getElementById("nomeUsuario").textContent = nome;
}

const cidade = params.get("cidade");
const idade = params.get("idade");

if (cidade) {
  document.getElementById("cidade").textContent = cidade;
}

if (idade) {
  document.getElementById("idade").textContent = idade;
}
