//archivo para variables globales, se comparten en todos los archivos
//este script se importara antes que todos

// const defaultDylan = {
//     vida: 100,
//     fuerza: 90,
//     defensa: 80
// }

//ctx es para configurar el `2d`

const canvas = document.getElementById("my-canvas"); //** importante
const ctx = canvas.getContext("2d") //** importante
//letras
ctx.font = "50px serif";

// globales

//para hacer que avancen con el paso del tiempo
let frames = 0;
const gravity = 0.1;
//pipes: arreglo que va a tener todos los arreglitos y van a hacer asi mismo objetos. array=[...array,{...},{...}]
const arrPipes = [];
let points = 0;

let levelHard = 1; //dificultad

let requestId; // para mi juego o validar que esta corriendo / es muy importante para saber si seguimos jugando o se acaba el juego


const audio = new Audio() //*
audio.src = audio/drama.mp3;
audio.volume = 0.2;
audio.loop = true //* 
/**
 * si quieres musica
 * const audio = new Audio()
 * audio.src = ""; para meter audio (como las imagenes)
 * efecto ?
 */