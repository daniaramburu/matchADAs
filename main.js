const grillaEnHTML = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");
const contenedorBotonFacil = document.getElementById("contenedor-boton-facil");
const contenedorBotonMedio = document.getElementById("contenedor-boton-medio");
const contenedorBotonDificil = document.getElementById(
  "contenedor-boton-dificil"
);
const gatitosSeleccionados = document.querySelectorAll(".seleccionado");
let gatitoGuardadoEnClickAnterior = null;
const contenedorGrilla = document.querySelector('.contenedor-grilla')

botonFacil.onclick = () => {
  comenzarJuegoSinMatchesFacil();
  ocultarSeleccionDificultad();
  contenedorGrilla.classList.add('grilla-facil')

  // reiniciarJuego.classList.add("facil");
};

botonMedio.onclick = () => {
  comenzarJuegoSinMatchesMedio();
  ocultarSeleccionDificultad();
  contenedorGrilla.classList.add('grilla-media')
  // ocultarBotones();
  // reiniciarJuego.classList.add("medio");
};

botonDificil.onclick = () => {
  comenzarJuegoSinMatchesDificil();
  ocultarSeleccionDificultad();
  contenedorGrilla.classList.add('grilla-dificil')
  // reiniciarJuego.classList.add("dificil");
  // clickeable();
  // console.log(clickeable());
};

const comenzarJuegoSinMatchesFacil = () => {
  do {
    console.log(generarGrilla(9, 9));
    generarGrilla(9, 9);
    agregarGrillaAHTML(9, 9);
  } while (buscarBloqueInicial());
};

const comenzarJuegoSinMatchesMedio = () => {
  do {
    // vaciarGrilla();
    generarGrilla(8, 8);
    agregarGrillaAHTML(8, 8);
  } while (buscarBloqueInicial());
};

const comenzarJuegoSinMatchesDificil = () => {
  do {
    //vaciarGrilla();
    console.log(generarGrilla(7, 7));
    generarGrilla(7, 7);
    agregarGrillaAHTML(7, 7);
  } while (buscarBloqueInicial());
};

const buscarBloqueInicial = () => {
  for (let i = 0; i < grilla.length; i++) {
    for (let j = 0; j < grilla[i].length; j++) {
      if (
        grilla[i][j] === grilla[i][j + 1] &&
        grilla[i][j + 1] === grilla[i][j + 2]
      ) {
        return true;
      }
      if (
        grilla[i + 1] &&
        grilla[i + 2] &&
        grilla[i][j] === grilla[i + 1][j] &&
        grilla[i][j] === grilla[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
};

const items = ["🐔", "🐣", "🐤", "🐥", "🐦", "💩"];

let grilla = [];

const obtenerNumeroAlAzar = (items) => {
  return Math.floor(Math.random() * items.length);
};

const obtenerItemAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)];
};

// ----------- GENERAR GRILLA

const generarGrilla = (ancho, alto) => {
  grilla = [];
  for (let i = 0; i < ancho; i++) {
    grilla[i] = [];
    for (let j = 0; j < alto; j++) {
      grilla[i][j] = obtenerItemAlAzar(items);
    }
  }
  return grilla;
};

// ------------- GENERAR CUADRADO

const generarCuadrado = (x, y, array) => {
  const tamanio = 50;

  const cuadrado = document.createElement("div");
  cuadrado.dataset.x = x;
  cuadrado.dataset.y = y;
  cuadrado.innerHTML = array[x][y];
  cuadrado.style.top = `${x * tamanio}px`;
  cuadrado.style.left = `${y * tamanio}px`;
  //cuadrado.addEventListener("click", seleccionarCuadrado);
  return cuadrado;
};

// ------------------ GENERAR GRILLA EN HTML

const agregarGrillaAHTML = (ancho) => {
  const anchoDeGrilla = 50 * ancho;
  grillaEnHTML.style.width = `${anchoDeGrilla}px`;
  const listaDeEmojis = grilla;
  grillaEnHTML.innerHTML = "";
  for (let i = 0; i < listaDeEmojis.length; i++) {
    for (let j = 0; j < listaDeEmojis[i].length; j++) {
      grillaEnHTML.appendChild(generarCuadrado(i, j, listaDeEmojis));
    }
  }
  console.log("aca esta la lista de mierda", listaDeEmojis);
};

//funcion que retorna si dos cuadrados son adyacentes
const sonAdyacentes = (cuadrado1, cuadrado2) => {
  const datax1 = Number(cuadrado1.dataset.x);
  const datax2 = Number(cuadrado2.dataset.x);
  const datay1 = Number(cuadrado1.dataset.y);
  const datay2 = Number(cuadrado2.dataset.y);
  if (
    (datax1 === datax2 && datay1 === datay2 + 1) ||
    (datax1 === datax2 && datay1 === datay2 - 1) ||
    (datay1 === datay2 && datax1 === datax2 + 1) ||
    (datay1 === datay2 && datax1 === datax2 - 1)
  ) {
    console.log("son adyacentes");
    return true;
  } else {
    console.log("NO son adyacentes");
    return false;
  }
};

// ------------------------ CLICKEAR EL EMOJI

const creoDivEmoji = (x, y) => {};

const clickeable = () => {
  const emojiEnHTML = document.querySelectorAll(".imagen-gatito");

  for (let emoji of emojiEnHTML) {
    emoji.onclick = () => {
      emoji.classList.toggle("clickeable");
      console.log("HIZO CLICK");
    };
  }
};

// ------------------------------------INICIO MODALES
const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
const AJugar = document.getElementById("boton-jugar");
// const botonCruz = document.querySelector(".delete");
const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
const modalDificultadInterior = document.querySelector(".modal-dificultad");

//const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

const ocultarBienvenida = () => {
  modalBienvenida.classList.add("ocultar");
};

const ocultarSeleccionDificultad = () => {
  modalDificultad.classList.add("ocultar");
};

AJugar.onclick = () => {
  ocultarBienvenida();
  modalDificultadInterior.classList.add("is-active");
};
