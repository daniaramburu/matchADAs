const grillaEnHTML = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");
const contenedorBotonFacil = document.getElementById("contenedor-boton-facil");
const contenedorBotonMedio = document.getElementById("contenedor-boton-medio");
const contenedorBotonDificil = document.getElementById("contenedor-boton-dificil");
const gatitosSeleccionados = document.querySelectorAll(".seleccionado");
let gatitoGuardadoEnClickAnterior = null;

const items = ['🐔', '🐣', '🐤', '🐥',];

let grilla = [];

const obtenerNumeroAlAzar = items => {
    return Math.floor((Math.random() * items.length))
}

const obtenerItemAlAzar = items => {
    return items[obtenerNumeroAlAzar(items)]
}

// ----------- GENERAR GRILLA

const generarGrilla = () => {
  grilla = []
  for (let i = 0; i < 10; i++) {
    grilla[i] = []
    for (let j = 0; j < 10; j++) {
      grilla[i][j] = obtenerItemAlAzar(items)
    }
  }
  return grilla
}

// ------------- GENERAR CUADRADO

const generarCuadrado = (x, y, array) => {
  const tamanio = 50

  const cuadrado = document.createElement('div')
  cuadrado.dataset.x = x
  cuadrado.dataset.y = y 
  cuadrado.innerHTML = array[x][y]
  cuadrado.style.top = `${x * tamanio}px`
  cuadrado.style.left = `${y * tamanio}px`
  return cuadrado

}

// ------------------ GENERAR GRILLA EN HTML

const agregarGrillaAHTML = () => {
  const anchoDeGrilla = 50 * 10
  grillaEnHTML.style.width = `${anchoDeGrilla}px`
  const listaDeEmojis = grilla;
  for (let i = 0; i < listaDeEmojis.length; i++) {
    for (let j = 0; j < listaDeEmojis[i].length; j++) {
      grillaEnHTML.appendChild(generarCuadrado(i, j, listaDeEmojis))
    }
  }
console.log("aca esta la lista de mierda", listaDeEmojis)

}

generarGrilla()
agregarGrillaAHTML()

// ------------------------ CLICKEAR EL EMOJI


// const clickeable = () => {
//   const emojiEnHTML = document.querySelectorAll(".imagen-gatito");

//   for (let emoji of emojiEnHTML) {
//     emoji.onclick = () => {
//       emoji.classList.toggle("clickeable");
//       console.log ("HIZO CLICK")
//     };
//   }
// };


// ------------------------------------INICIO MODALES
const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
const AJugar = document.getElementById("boton-jugar");
const botonCruz = document.querySelector(".delete");
const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

const ocultarBienvenida = () => {
  modalBienvenida.classList.add("ocultar");
};

const ocultarSeleccionDificultad = () => {
  modalDificultad.classList.add("ocultar");
};

AJugar.onclick = () => {
  ocultarBienvenida();
};
