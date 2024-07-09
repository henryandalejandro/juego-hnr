let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 50;
let nombre = prompt("Ingrese su nombre por favor");

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('.texto__parrafo', `'Que berriendit@ :)' ¡${nombre}, acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}!`);
        mostrarImagenAcierto();
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es menor');
        } else {
            asignarTextoElemento('.texto__parrafo', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('.texto__parrafo', 'Ya se sortearon todos los números posibles');
    } else if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('.texto__parrafo', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    limpiarCaja();

    // Eliminar la imagen de acierto si existe
    let contenedorImagen = document.querySelector('.acierto');
    if (contenedorImagen) {
        contenedorImagen.remove();
    }

    listaNumerosSorteados = [];
    condicionesIniciales();
}

function mostrarImagenAcierto() {
    let contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('acierto');
    
    let imagen = document.createElement('img');
    imagen.src = './img/sucess.webp'; // Ruta de la imagen
    imagen.alt = 'Acierto';
    imagen.classList.add('imagen-acierto');
    
    contenedorImagen.appendChild(imagen);
    document.querySelector('.container__contenido').appendChild(contenedorImagen);
}

condicionesIniciales();

// let ListaGenerica=['JavaScript', 'C', 'C++', 'Kotlin','Python, Java, Henry'];

// function lista() {
// console.log(ListaGenerica);
// }