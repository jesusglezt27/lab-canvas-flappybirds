
//window es un objeto con metodos y propiedades del explorador
//onload cuando termine de cargar la pagina, hago la funcion

//motor donde ejecute todo ya que la pagina se cargue

window.onload = function() {
  //llamar clase
  const bg = new background(canvas.width,canvas.height)
  const flappy = new Flappy(100,200,60,60)
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    console.log("funciono")
    //ejecutar el update game
    if(!requestId){
      audio.play()
    requestId = requestAnimationFrame(updateGame)
    }
  }

// CORAZON DE NUESTRO JUEGO
  function updateGame(){
    frames ++;
    // .clearRect(x,y,width,height)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    bg.update()
    //dibujar todos los elementos despues del background
    flappy.update()
    drawPipes()
    generatePipes()

    ctx.fillText(`points:${points}`, 290,100)

    
    if(flappy.y > canvas.height){
      gameOver()
    }

    //validar si aun estamos jugando
    if(requestId){
      requestAnimationFrame(updateGame)
    }
  }

  function gameOver(){
    //regresar requestId a undefined y mostrar una imagen que represente que ya me mori
    audio.pause();
    console.log("moriste")
    requestId = undefined;
    ctx.fillStyle = "red";
    ctx.fillText("Te moriste u.u",200,300)
    /**
     * reiniciar posicion de flappy a sus valores por defecto, tambien los points etc...
     */
  }

// generatePipe() drawPipe() validar al flappy que choque contra un pipe /*puntos y la musica*/
function generatePipes(){
  if(!(frames % 160 === 0)){
    return true;
  }
// height random
// Math.floor( Math.random() * (max-min) + min )
const height = Math.floor(Math.random() * (canvas.height * 0.6) + 30)
const pipeTop = new Pipe("top", canvas.width, 0, height);
const pipeBottom = new Pipe("bottom", canvas.width, height + 120, canvas.height - 120 - height);

arrPipes.push(pipeTop,pipeBottom)

}

function drawPipes(){
  arrPipes.forEach((pipe,pipe_index)=>{
    //Validar si ya se salio mi pipe del canvas, eliminarlo del arreglo
    if(pipe.x < .30){
      //metodo para eliminarlo
      arrPipes.splice(pipe_index,1)
      //points
      points += 0.5;
    }

    pipe.update()
    //Validar si flappy toca un pipe
    if(flappy.collision(pipe) ){
      gameOver()
    }
  });
}

// addEventListener keydown

addEventListener("keydown",(event)=>{
  if(event.keyCode===32){
    //codigo bueno
    flappy.userPull = 0.3;
  }
})

addEventListener("keyup",()=>{
  if(event.keyCode == 32){
    flappy.userPull = 0;
  }
})
};
