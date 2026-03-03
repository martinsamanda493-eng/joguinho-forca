const palavras = ["banana", "computador", "javascript", "amanda", "forca", "basquete"];
let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let palavraExibida = "_".repeat(palavraSecreta.length);
let letrasErradas = [];
let tentativas = 6;

document.getElementById("palavra").textContent = palavraExibida;

const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");

// Desenha a base da forca
function desenharBase() {
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 190); ctx.lineTo(190, 190); // chão
  ctx.moveTo(50, 190); ctx.lineTo(50, 20);   // poste vertical
  ctx.lineTo(120, 20);                       // barra superior
  ctx.lineTo(120, 40);                       // corda
  ctx.stroke();
}

// Desenha partes do boneco conforme erros
function desenharBoneco(erros) {
  switch (erros) {
    case 1: // cabeça
      ctx.beginPath();
      ctx.arc(120, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2: // corpo
      ctx.moveTo(120, 80);
      ctx.lineTo(120, 130);
      ctx.stroke();
      break;
    case 3: // braço esquerdo
      ctx.moveTo(120, 90);
      ctx.lineTo(90, 110);
      ctx.stroke();
      break;
    case 4: // braço direito
      ctx.moveTo(120, 90);
      ctx.lineTo(150, 110);
      ctx.stroke();
      break;
    case 5: // perna esquerda
      ctx.moveTo(120, 130);
      ctx.lineTo(90, 160);
      ctx.stroke();
      break;
    case 6: // perna direita
      ctx.moveTo(120, 130);
      ctx.lineTo(150, 160);
      ctx.stroke();
      break;
  }
}

desenharBase();

function jogar() {
  const letra = document.getElementById("letra").value.toLowerCase();
  document.getElementById("letra").value = "";

  if (palavraSecreta.includes(letra)) {
    let novaPalavra = "";
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        novaPalavra += letra;
      } else {
        novaPalavra += palavraExibida[i];
      }
    }
    palavraExibida = novaPalavra;
    document.getElementById("palavra").textContent = palavraExibida;
  } else {
    if (!letrasErradas.includes(letra)) {
      letrasErradas.push(letra);
      tentativas--;
      document.getElementById("letrasErradas").textContent = "Letras Erradas: " + letrasErradas.join(", ");
      desenharBoneco(letrasErradas.length);
    }
  }

  if (palavraExibida === palavraSecreta) {
    document.getElementById("mensagem").textContent = "🎉 Você venceu!";
  } else if (tentativas === 0) {
    document.getElementById("mensagem").textContent = "💀 Você perdeu! A palavra era: " + palavraSecreta;
  }
}