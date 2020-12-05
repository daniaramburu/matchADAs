const grilla = document.querySelector(".grilla");
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

let arrayDeEmojis = ['🐔', '🐣', '🐤', '🐥',];

let listaDeEmojis = [];

const obtenerNumeroAlAzar = items => {
    return Math.floor((Math.random() * items.length))
}

const obtenerItemAlAzar = items => {
    return items[obtenerNumeroAlAzar(items)]
}

const generarGrilla = (filas, columnas, items) => {
    const anchoDeGrilla = 50 * filas
    grilla.style.width = `${anchoDeGrilla}px`;

    for (let i = 0; i < filas; i++) {
        listaDeFrutas[i] = [];
        for (let j = 0; j < columnas; j++) {
            listaDeFrutas[i][j] = obtenerItemAlAzar(items)

            grilla.innerHTML += `<div class="item" data-x="${i}" data-y="${j}">${arrayDeEmojis[i][j]}</div>`
        }
    }

  return grilla

}
    
console.log(listaDeEmojis)


// ------------------------------------INICIO MODALES
// const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
// const AJugar = document.getElementById("boton-jugar");
// const botonCruz = document.querySelector(".delete");
// const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
// const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

// const ocultarBienvenida = () => {
//   modalBienvenida.classList.add("ocultar");
// };

// const ocultarSeleccionDificultad = () => {
//   modalDificultad.classList.add("ocultar");
// };

// AJugar.onclick = () => {
//   ocultarBienvenida();
//};
