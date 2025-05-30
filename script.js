document.addEventListener('DOMContentLoaded', () => {
  // Array com 3 pares de imagens (total 6 cartas) - C#, Java, TypeScript
  const imagensPares = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", // C#
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",     // Java
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", // TypeScript
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  ];

  // Variáveis de controle do jogo
  let cartas = [];
  let cartasViradas = [];
  let bloqueado = false;
  let paresEncontrados = 0;
  let tentativas = 0;
  let historico = JSON.parse(localStorage.getItem("historicoMemoria")) || [];

  // Função para embaralhar as cartas (algoritmo Fisher-Yates)
  function embaralhar(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Cria o tabuleiro de cartas na tela
  function criarTabuleiro() {
    const tabuleiro = document.querySelector('.tabuleiro');
    tabuleiro.innerHTML = '';
    cartas.forEach((img, i) => {
      const carta = document.createElement('div');
      carta.className = 'carta';
      carta.dataset.index = i;
      carta.innerHTML = `
        <div class="carta-inner">
          <div class="carta-frente"></div>
          <div class="carta-verso">
            <img src="${img}" alt="carta" width="80" height="80">
          </div>
        </div>
      `;
      carta.addEventListener('click', virarCarta);
      tabuleiro.appendChild(carta);
    });
  }

  // Lógica ao virar uma carta
  function virarCarta(e) {
    if (bloqueado) return; // Impede virar mais cartas enquanto verifica par
    const carta = e.currentTarget;
    const index = carta.dataset.index;
    // Impede virar a mesma carta ou cartas já viradas
    if (cartasViradas.includes(index) || carta.classList.contains('virada')) return;
    carta.classList.add('virada');
    cartasViradas.push(index);

    // Se duas cartas foram viradas, verifica se são um par
    if (cartasViradas.length === 2) {
      bloqueado = true;
      tentativas++;
      atualizarTentativas();
      setTimeout(verificarPar, 900);
    }
  }

  // Verifica se as duas cartas viradas são um par
  function verificarPar() {
    const [i1, i2] = cartasViradas;
    const cartasDOM = document.querySelectorAll('.carta');
    if (cartas[i1] === cartas[i2]) {
      paresEncontrados++;
      // Se encontrou todos os pares, exibe mensagem e salva histórico
      if (paresEncontrados === 3) {
        mostrarStatus("🎉 PARABÉNS! Você encontrou todos os pares!");
        salvarHistorico();
      }
    } else {
      // Se não for par, desvira as cartas
      cartasDOM[i1].classList.remove('virada');
      cartasDOM[i2].classList.remove('virada');
    }
    cartasViradas = [];
    bloqueado = false;
  }

  // Mostra mensagem de status para o jogador
  function mostrarStatus(msg) {
    document.getElementById('status').textContent = msg;
  }

  // Atualiza o número de tentativas na tela
  function atualizarTentativas() {
    document.getElementById('tentativas').textContent = `Tentativas nesta rodada: ${tentativas}`;
  }

  // Salva o número de tentativas no histórico (localStorage)
  function salvarHistorico() {
    historico.push(tentativas);
    localStorage.setItem("historicoMemoria", JSON.stringify(historico));
    mostrarHistorico();
  }

  // Mostra o histórico de tentativas de todas as rodadas
  function mostrarHistorico() {
    let texto = "Histórico de tentativas: ";
    if (historico.length === 0) {
      texto += "Nenhuma rodada ainda.";
    } else {
      texto += historico.map((t, i) => `Rodada ${i+1}: ${t}`).join(" | ");
    }
    document.getElementById('tentativas').innerHTML += `<br><small>${texto}</small>`;
  }

  // Reinicia o jogo: embaralha cartas, zera variáveis e atualiza tela
  function reiniciarJogo() {
    cartas = embaralhar(imagensPares);
    cartasViradas = [];
    paresEncontrados = 0;
    tentativas = 0;
    mostrarStatus('');
    atualizarTentativas();
    criarTabuleiro();
    mostrarHistorico();
  }

  // Evento do botão de reiniciar
  document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

  // Inicialização do jogo ao carregar a página
  reiniciarJogo();
})