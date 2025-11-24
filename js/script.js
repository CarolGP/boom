const inputNumero = document.getElementById('userInput');
const countdownDiv = document.getElementById('countdown');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
let juegoPlay = false;

function numeroAleatorio(){
    const numero = Math.floor(Math.random() * 3)+1;
    console.log('El numeor generado es:', numero);
    return numero;
}

function cuentaAtras(){
    return new Promise((resolve) => {
        let tiempo = 5;
        countdownDiv.textContent = tiempo;
        console.log('Cuenta atrás en:', tiempo);

    const interval = setInterval (() => {
        tiempo--;
        countdownDiv.textContent=tiempo;
        console.log('Tiempo restante:', tiempo);

        if (tiempo===0){
            clearInterval(interval);
            const numeroSecreto = numeroAleatorio();
            console.log('Fin de la cienta atrás', numeroSecreto);
            resolve(numeroSecreto);
        }
    }, 1000);
    });
}

function iniciarJuego(){
    if(juegoPlay) {
        console.log('El juego ha empezado');
        return;
    }
    const valorUsuario = Number(inputNumero.value);
    console.log('Numero elegido:', valorUsuario);
    

    if (valorUsuario <1 || valorUsuario > 3 || isNaN(valorUsuario)) {
        resultDiv.textContent = 'Intro un numero del 1 al 3';
        return;
    }

juegoPlay = true;
inputNumero.disabled = true;
resultDiv.textContent = 'La bomba está activada tienes 5s egundos.';
countdownDiv.textContent = '5';

cuentaAtras().then ((numeroSecreto) => {
    console.log('Comprobando resultado');

    if (valorUsuario === numeroSecreto) {
        resultDiv.textContent= `🥳 has salvado el mundo eleigiendo el ${valorUsuario}.`;
    }else {
        resultDiv.textContent = `💥 la bomba ha explotado. El
 numero secreto era ${numeroSecreto}.`;
   }
});
}

inputNumero.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        iniciarJuego();
    }
});

restartBtn.addEventListener('click', () =>{
    location.reload();
});