const params = new URLSearchParams(window.location.search);
const nome = params.get("nome");
const cidade = params.get("cidade");
const idade = params.get("idade");

// Exibe nome, cidade e idade personalizados
if (nome) document.getElementById("nomeUsuario").textContent = nome;
if (cidade) document.getElementById("cidade").textContent = cidade;
if (idade) document.getElementById("idade").textContent = idade;

// Seleciona elementos de notificação
const notificacao = document.getElementById("notificacaoCompra");
const cidadeSpan = document.getElementById("cidadeNotificacao");

let filaNotificacoes = [];

// Carrega o JSON com cidades e vizinhas
fetch("style/data/cidades_brasil_vizinhas.json")
  .then((res) => res.json())
  .then((cidades) => {
    const cidadeObj = cidades.find(
      (c) => c.nome.toLowerCase() === cidade?.toLowerCase()
    );

    if (cidadeObj) {
      filaNotificacoes = [cidadeObj.nome, ...cidadeObj.vizinhas];
    } else {
      filaNotificacoes = ["São Paulo", "Rio de Janeiro", "Brasília"];
    }

    iniciarNotificacoes();
  });

function iniciarNotificacoes() {
  let i = 0;

  setTimeout(() => {
    exibirNotificacao(filaNotificacoes[i % filaNotificacoes.length]);
    i++;

    setInterval(() => {
      exibirNotificacao(filaNotificacoes[i % filaNotificacoes.length]);
      i++;
    }, 9000); // a cada 10s
  }, 3000); // começa após 3s
}

function exibirNotificacao(cidadeExibir) {
  cidadeSpan.textContent = cidadeExibir;
  notificacao.classList.remove("hidden");
  notificacao.classList.add("show");

  setTimeout(() => {
    notificacao.classList.remove("show");
  }, 4000); // some após 4s
}

// Adiciona evento de clique para tocar o som

window.addEventListener("load", () => {
  const som = document.getElementById("somNotificacao");

  if (som) {
    som.volume = 0;
    som
      .play()
      .then(() => {
        som.pause();
        som.currentTime = 0;
        som.volume = 1; // volta ao normal
      })
      .catch(() => {
        console.warn("Som ainda bloqueado, aguardando interação");
      });
  }
});

// Toca normalmente:

function exibirNotificacao(cidadeExibir) {
  cidadeSpan.textContent = cidadeExibir;
  notificacao.classList.remove("hidden");
  notificacao.classList.add("show");

  // Tocar som (se permitido)
  const som = document.getElementById("somNotificacao");
  if (som && typeof som.play === "function") {
    som.play().catch((e) => {
      console.warn("Som bloqueado até interação do usuário");
    });
  }

  setTimeout(() => {
    notificacao.classList.remove("show");
  }, 4000);
}
