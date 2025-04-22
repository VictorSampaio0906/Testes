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
