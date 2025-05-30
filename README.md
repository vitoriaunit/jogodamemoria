# 🧠🃏 Jogo da Memória - 3 Pares

Um jogo da memória simples, divertido e interativo, desenvolvido com HTML, CSS e JavaScript.  
Encontre os 3 pares de cartas e desafie sua memória!

---

## 🎮 Como funciona

- Seis cartas (3 pares) são embaralhadas aleatoriamente a cada nova partida.
- O jogador pode virar 2 cartas por jogada.
- Se forem iguais, permanecem viradas. Se forem diferentes, viram de volta.
- O jogo termina quando todos os pares forem encontrados.
- Cada jogada (tentativa de virar 2 cartas) é registrada.
- Ao vencer, é exibida a mensagem: **"🎉 Parabéns, você venceu!"**
- O botão **"Reiniciar Jogo"**:
  - Zera o tabuleiro
  - Embaralha novamente as cartas
  - Mantém o histórico de tentativas em `localStorage`

---

## 💾 Registro no localStorage

- Cada vez que o jogador vira duas cartas, é registrada uma tentativa.
- Um histórico completo das tentativas por rodada é salvo e exibido.

---

## 📷 Interface

- Cartas estilizadas com animações de virar
- Imagens diferentes por carta (você pode usar ícones, emojis, ou imagens reais)
- Plano de fundo personalizado e visual limpo e moderno

---

## 🚀 Tecnologias usadas

- HTML5
- CSS3 (Flexbox e transições)
- JavaScript puro
- localStorage API

---

