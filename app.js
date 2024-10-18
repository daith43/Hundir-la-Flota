// Variables
const contTablero = document.querySelector(".cont-tamano");
const contNumBarcos = document.querySelector(".cont-num-barcos");
const btnTamano = document.querySelector("#btn-tamano");
const btnNumBarcos = document.querySelector("#btn-num-barcos");
const btnRendirse = document.querySelector("#btn-rendirse");
const btnReiniciar = document.querySelector("#btn-reiniciar");
const tablero = document.querySelector("#tablero");
const mensaje = document.querySelector("#mensaje");

let tamano, numBarcos, tocados = 0;
let array = [];

// Eventos
btnTamano.addEventListener("click", () => {
  tamano = document.querySelector("#tamano").value;
  if (tamano >= 3 && tamano <= 8) {
    contTablero.style.display = "none";
    contNumBarcos.style.display = "flex";

    // El tamaño del tablero es tablero al cuadrado, por tanto el numero maximo de barcos será (tamano**2)/2, se calcula y se muestra en un span
    let span = document.querySelector("span");
    span.textContent = `${Math.floor(tamano ** 2 / 2)}`;
  }
});

btnNumBarcos.addEventListener("click", () => {
  numBarcos = document.querySelector("#numBarcos").value;
  if (numBarcos >= 1 && numBarcos <= Math.floor(tamano ** 2 / 2)) {
    contNumBarcos.style.display = "none";
    generarTablero();
  }
});

/* Generar tablero */

const generarTablero = () => {
  tablero.style.display = "grid";
  btnRendirse.style.display = "block";
  for (let i = 0; i < tamano ** 2; i++) {
    if (i == 0 || i < numBarcos) {
      array.push("red");
    } else {
      array.push("blue");
    }
  }
  // Aleatorizamos el array:
  array.sort(() => 0.5 - Math.random());

  // Creamos las casillas y añadimos la clase según sean rojos o azules
  for (let j = 0; j < array.length; j++) {
    let casilla = document.createElement("div");
    casilla.classList.add("casilla");
    casilla.classList.add(`${array[j]}`);
    tablero.appendChild(casilla);
  }
  // Al ser un array y no una matriz, cuando la primera fila sea del tamaño establecido pegará un salto simulando una matriz
  tablero.style.gridTemplateRows = `repeat(${tamano}, 1fr)`;

  const mostrarCasilla = () => {
    document.querySelectorAll(".casilla").forEach(casilla => {
      casilla.addEventListener("click", () => {
        mensaje.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        const esRojo = casilla.classList.contains("red");
        casilla.style.backgroundColor = esRojo ? "red" : "blue";
        mensaje.style.color = esRojo ? "red" : "blue";
        mensaje.textContent = esRojo ? "Tocado" : "Agua";
  
        if (esRojo) {
          tocados++;
          if (parseInt(numBarcos) === tocados) {
            mensaje.style.color = "green";
            mensaje.style.backgroundColor = "rgba(139, 239, 171, 0.9)";
            mensaje.textContent = "!Has ganado!";
            tablero.style.pointerEvents = "none";
            btnRendirse.style.display = "none";
            btnReiniciar.style.display = "block";
          }
        }
      });
    });
  };
  mostrarCasilla();
};

btnRendirse.addEventListener("click", () => {
  document.querySelectorAll(".casilla").forEach(casilla => {
    if (casilla.classList.contains("red")) {
      casilla.style.backgroundColor = "red";
    } else {
      casilla.style.backgroundColor = "blue";
    }
  });
  mensaje.style.color = "red";
  mensaje.style.backgroundColor = "rgba(242, 122, 122, 0.8)";
  mensaje.textContent = "¡Has perdido!";
  tablero.style.pointerEvents = "none";
  btnRendirse.style.display = "none";
  btnReiniciar.style.display = "block";
});

btnReiniciar.addEventListener("click", () => location.reload());
