const inputNumero = document.getElementById('userInput');
const countdownDiv = document.getElementById('countdown');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
let juegoPlay = false;

function numeroAleatorio() {
  return Math.floor(Math.random() * 3) + 1;
}

function cuentaAtras() {
  return new Promise((resolve) => {
    let tiempo = 5;
    countdownDiv.textContent = tiempo;

    const interval = setInterval(() => {
      tiempo--;
      countdownDiv.textContent = tiempo;

      if (tiempo === 0) {
        clearInterval(interval);
        const numeroSecreto = numeroAleatorio();
        resolve(numeroSecreto);
      }
    }, 1000);
  });
}

function iniciarJuego() {
  if (juegoPlay) return;

  const valorUsuario = Number(inputNumero.value);

  if (valorUsuario < 1 || valorUsuario > 3 || isNaN(valorUsuario)) {
    resultDiv.textContent = 'Introduce un número del 1 al 3';
    return;
  }

  juegoPlay = true;
  inputNumero.disabled = true;
  resultDiv.textContent = 'La bomba está activada, tienes 5 segundos.';

  cuentaAtras().then((numeroSecreto) => {
    if (valorUsuario === numeroSecreto) {
      resultDiv.textContent = `🥳 Has salvado el mundo eligiendo el ${valorUsuario}. El número secreto era ${numeroSecreto}.`;
    } else {
      resultDiv.textContent = `💥 La bomba ha explotado. Tú elegiste ${valorUsuario} y el número secreto era ${numeroSecreto}.`;
    }
  });
}

inputNumero.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    iniciarJuego();
  }
});

restartBtn.addEventListener('click', () => {
  location.reload();
});
