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


botonFacil.onclick = () => {
     comenzarJuegoSinMatchesFacil();
     ocultarSeleccionDificultad()
   
    // reiniciarJuego.classList.add("facil");
  };
  
  botonMedio.onclick = () => {
     comenzarJuegoSinMatchesMedio();
  
    // ocultarBotones();
    // reiniciarJuego.classList.add("medio");
  };
  
  botonDificil.onclick = () => {
     comenzarJuegoSinMatchesDificil();
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



const items = ["🐔", "🐣", "🐤", "🐥"];

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
  for (let i = 0; i < listaDeEmojis.length; i++) {
    for (let j = 0; j < listaDeEmojis[i].length; j++) {
      grillaEnHTML.appendChild(generarCuadrado(i, j, listaDeEmojis));
    }
  }
  console.log("aca esta la lista de mierda", listaDeEmojis);
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
// const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
// const AJugar = document.getElementById("boton-jugar");
// const botonCruz = document.querySelector(".delete");
 const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
 console.log(modalDificultad)
 //const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

// const ocultarBienvenida = () => {
 //  modalBienvenida.classList.add("ocultar");
 //};

 const ocultarSeleccionDificultad = () => {
   modalDificultad.classList.add("ocultar");
   //modalDificultad.classList.remove("is-active");
 };

// AJugar.onclick = () => {
//   ocultarBienvenida();
//};
