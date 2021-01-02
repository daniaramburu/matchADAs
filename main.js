const grillaEnHTML = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");
const contenedorBotonFacil = document.getElementById("contenedor-boton-facil");
const contenedorBotonMedio = document.getElementById("contenedor-boton-medio");
const contenedorBotonDificil = document.getElementById("contenedor-boton-dificil");
const contenedorGrilla = document.querySelector('.contenedor-grilla');
const reloj = document.querySelector('.barra-de-tiempo');
const modalReiniciar = document.querySelector('.modal-reiniciar');
const botonInformacion = document.getElementById('boton-info');
const botonCancelarDeModal = document.getElementById('cancelar');
const botonReiniciarDeModal = document.getElementById('reiniciar');
const botonReiniciar = document.querySelector('.reiniciar');



botonInformacion.onclick = () => {
    mostrarBienvenida();
}

botonFacil.onclick = () => {
    comenzarJuegoSinMatchesFacil();
    ocultarSeleccionDificultad();
    tiempo = 30
    cuentaRegresiva()

    mostrarReloj();

    contenedorGrilla.classList.add('grilla-facil')

    // reiniciarJuego.classList.add("facil");
};

botonMedio.onclick = () => {
    comenzarJuegoSinMatchesMedio();
    ocultarSeleccionDificultad();
    tiempo = 30
    cuentaRegresiva()

    mostrarReloj();


    contenedorGrilla.classList.add('grilla-media')

    // ocultarBotones();
    // reiniciarJuego.classList.add("medio");
};

botonDificil.onclick = () => {
    comenzarJuegoSinMatchesDificil();
    ocultarSeleccionDificultad();
    tiempo = 30
    cuentaRegresiva()

    mostrarReloj();


    contenedorGrilla.classList.add('grilla-dificil')
        // reiniciarJuego.classList.add("dificil");

};

const comenzarJuegoSinMatchesFacil = () => {
    do {

        generarGrilla(9, 9);
        agregarGrillaAHTML(9, 9);
    } while (buscarBloqueInicial());
};

const comenzarJuegoSinMatchesMedio = () => {
    do {

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


const cantidadDeMatches = document.querySelector("#matches")
console.log(cantidadDeMatches)

let contadorDeMatches = 1

const contarMatches = () => {
    contadorDeMatches ++
    cantidadDeMatches.innerHTML = contadorDeMatches
}

const resetearContadorDeMatches = () => {
    contadorDeMatches = 1
    cantidadDeMatches.innerHTML = contadorDeMatches 
}


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

const items = ["🐔", "🐣", "🐤", "🐥", "🦉", "🦢"];

let grilla = [];

const obtenerNumeroAlAzar = (items) => {
    return Math.floor(Math.random() * items.length);
};

const obtenerItemAlAzar = (items) => {
    return items[obtenerNumeroAlAzar(items)];
};

// ----------- GENERAR GRILLA

//podriamos cambiar el nombre a generarGrillaJs ?

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
    cuadrado.addEventListener("click", cuadradosSeleccionados);
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
    // console.log("aca esta la lista de mierda", listaDeEmojis);
};



////////////////////////////////////
const cuadradosSeleccionados = (e) => {
    let cuadradoClickeado = document.querySelector(".seleccionar");
    //si esta seleccionado
    if (cuadradoClickeado) {
        if (sonAdyacentes(cuadradoClickeado, e.target)) {
            intercambiarCuadrados(cuadradoClickeado, e.target);
            if (buscarBloqueInicial()) {
                console.log("si hay match ,borrarlos");
                borrarMatches();
                contarMatches(); //// ejecuto contar los maches cuando encuentra adyacentes
                cuadradoClickeado.classList.remove("seleccionar");
                rellenarEspacios()
            } else {
                setTimeout(() => {
                    intercambiarCuadrados(cuadradoClickeado, e.target)
                }, 600);
            }
        } else {
            cuadradoClickeado.classList.remove("seleccionar");
            e.target.classList.add("seleccionar");
        }
    } else {
        console.log("cuadrado selccionado");
        e.target.classList.add("seleccionar");


    }
};


//rellenar la grilla 

const rellenarEspacios = () => {
        const todosLosCuadrados = document.querySelectorAll('.grilla>div') //seleccionamos cada cuadrado de html
        console.log(todosLosCuadrados)
        if (buscarBloqueInicial) {
            for (let cuadrado of todosLosCuadrados) { //recorremos los cuadrados
                let x = Number(cuadrado.dataset.x) // seleccionamos la data
                let y = Number(cuadrado.dataset.y) //seleccionamos la data
                if (cuadrado.innerHTML === '') { //si hay cuadrados vacios
                    grilla[x][y] = obtenerItemAlAzar(items); // los rellenamos con el array de emojis en js
                    setTimeout(() => {
                        cuadrado.innerHTML = grilla[x][y] //rellenamos los cuadrados vacios en html 
                        console.log(cuadrado.innerHTML = grilla[x][y])
                        if (buscarBloqueInicial()) {
                            rellenarEspacios();
                            borrarMatches()

                        }
                    }, 700); //tiempo que demora en rellenar
                }
            }

        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
const intercambiarCuadrados = (cuadrado1, cuadrado2) => {
    const datax1 = Number(cuadrado1.dataset.x);
    const datax2 = Number(cuadrado2.dataset.x);
    const datay1 = Number(cuadrado1.dataset.y);
    const datay2 = Number(cuadrado2.dataset.y);

    const tamanio = 50;
    // La posicion de 1 es data1 * tamanio
    // Si quiero que 1 ocupe el espacio que antes ocupaba 2
    // La nueva posicion de 1 debe ser data2 * tamanio


    //  modifico la grilla en JS
    let variableTemporal = grilla[datax1][datay1];
    grilla[datax1][datay1] = grilla[datax2][datay2];
    grilla[datax2][datay2] = variableTemporal;

    //  modifico la grilla en HTML

    if (datax1 === datax2 && (datay1 === datay2 + 1 || datay1 === datay2 - 1)) {
        cuadrado1.style.left = `${datay2 * tamanio}px`;
        cuadrado2.style.left = `${datay1 * tamanio}px`;
        cuadrado1.dataset.y = datay2;
        cuadrado2.dataset.y = datay1;
    } else if (
        datay1 === datay2 &&
        (datax1 === datax2 + 1 || datax1 === datax2 - 1)
    ) {
        cuadrado1.style.top = `${datax2 * tamanio}px`;
        cuadrado2.style.top = `${datax1 * tamanio}px`;
        cuadrado1.dataset.x = datax2;
        cuadrado2.dataset.x = datax1;
    }
};
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


const buscarMatchHorizontal = () => {
    //encuentra los match de manera horizontal, y los borra
    //de html y js
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (
                grilla[i][j] === grilla[i][j + 1] &&
                grilla[i][j + 1] === grilla[i][j + 2]
            ) {
                const div = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
                //div.style.backgroundColor = "yellow";

                div.innerHTML = ""; //elimina los match en html
                grilla[i][j] = null; //elimina los match en js
                const divDos = document.querySelector(
                    `div[data-x="${i}"][data-y="${j + 1}"]`
                );

                //divDos.style.backgroundColor = "yellow";
                divDos.innerHTML = ""; //elimina los match en html
                grilla[i][j + 1] = null; //elimina los match en js
                const divTres = document.querySelector(
                    `div[data-x="${i}"][data-y="${j + 2}"]`
                );
                //divTres.style.backgroundColor = "yellow";
                divTres.innerHTML = ""; //elimina los match en html
                grilla[i][j + 2] = null; //elimina los match en js
            }
        }
    }

};
const buscarMatchVertical = () => {

    //encuentra los match de manera vertical, y los borra
    //de html y js
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (
                grilla[i + 1] &&
                grilla[i + 2] &&
                grilla[i][j] === grilla[i + 1][j] &&
                grilla[i][j] === grilla[i + 2][j]
            ) {
                const uno = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
                //uno.style.backgroundColor = "red";
                uno.innerHTML = ""; //elimina los elementos en html
                grilla[i][j] = null; //elimina los elementos en js
                const dos = document.querySelector(
                    `div[data-x="${i + 1}"][data-y="${j}"]`
                );
                //dos.style.backgroundColor = "red";
                dos.innerHTML = ""; //elimina los elementos en html
                grilla[i + 1][j] = null; //elimina los elementos en js

                const tres = document.querySelector(
                    `div[data-x="${i + 2}"][data-y="${j}"]`
                );
                //tres.style.backgroundColor = "red";
                tres.innerHTML = ""; //elimina los elementos en html
                grilla[i + 2][j] = null; //elimina los elementos en js
            }
        }
    }

};

const borrarMatches = () => {
    buscarMatchVertical()
    buscarMatchHorizontal()
    //// aca tendria que reiniciar el contador de matches
    resetearContadorDeMatches()

}



// ------------------------------------INICIO MODALES
const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
const modalJuegoTerminado = document.querySelector('#contenedor-modal-final');
const AJugar = document.getElementById("boton-jugar");
// const botonCruz = document.querySelector(".delete");
const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
const modalDificultadInterior = document.querySelector(".modal-dificultad");

//const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

AJugar.onclick = () => {
    ocultarBienvenida();
    modalDificultadInterior.classList.add("is-active");
};

const ocultarBienvenida = () => {
    modalBienvenida.classList.add("ocultar");
};

const mostrarBienvenida = () => {
    modalBienvenida.classList.remove("ocultar");
};

const ocultarSeleccionDificultad = () => {
    modalDificultad.classList.add("ocultar");
};


AJugar.onclick = () => {
    ocultarBienvenida();
    modalDificultadInterior.classList.add("is-active");
};

/**************cuenta regresiva */
let tiempo = 30;
const tiempoHtml = document.querySelector(".tiempo");
const cuentaRegresiva = () => {
    tiempoHtml.innerHTML = `0 : ${tiempo}`;
    if (tiempo > 0) {
        tiempo--;
        setTimeout(cuentaRegresiva, 1000);

    } else {
        //tiempo = 30;
        // mostrarJuegoTerminado(); //agregar modal
    }
};
const mostrarSeleccionDificultad = () => {
    modalDificultad.classList.remove("ocultar");

}

const mostrarReloj = () => {
    reloj.classList.remove("ocultar");
}

const mostrarModalReiniciarJuego = () => {
    modalReiniciar.classList.remove("ocultar");
    modalReiniciar.classList.add("is-active");
}

const ocultarModalReiniciarJuego = () => {
    modalReiniciar.classList.add("ocultar");
    modalReiniciar.classList.remove("is-active");

}

botonReiniciar.onclick = () => {
    mostrarModalReiniciarJuego();
    console.log("esta clickeado")
    tiempo = 0
}

botonCancelarDeModal.onclick = () => {
    ocultarModalReiniciarJuego();
}

botonReiniciarDeModal.onclick = () => {

    mostrarSeleccionDificultad();
    if (botonReiniciarDeModal) {
        contenedorGrilla.classList.remove('grilla-facil')
        contenedorGrilla.classList.remove('grilla-media')
        contenedorGrilla.classList.remove('grilla-dificil')
    }


    ocultarModalReiniciarJuego();

}