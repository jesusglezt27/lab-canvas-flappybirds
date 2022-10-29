// aqui metes todas las clases del juego(si se va a mover el mono, el enemigo, etc etc...)
//1. pintar el fondo.(BACKGROUND)
// Sintax para crear la clase
class background{
    /** 
     * (@param no significa nada)
     * @param {number} w => canvas.width
     * @param {number} h => canvas.height
    */
    constructor(w,h){
        //(x,y,w,h): siempre se tienen que agregar.
        //para empezar a dibujar con X y Y, los pones en origen cero(0).
        this.x=0;
        this.y= 0;
        this.width= w;
        this.height= h;
        //imgs
        this.image = new Image(); //mando a llamar a la class nativa de Image.
        //image es un objeto que tiene (src: "",onLoad:()=>{})
        // ../ salir un nivel
        // ./ en ese mismo nivel
        // "../images/bg.png" sirve para salir de la carpeta hija de js y agarrar bg.png de images( pero en mi caso no me sirvio)
        this.image.src = "images/bg.png"
        //por el momento
        this.imageGameOver = new Image()
        this.imageGameOver.src = "https://w7.pngwing.com/pngs/359/749/png-transparent-death-certificate-sword-art-online-gamebanana-died-text-rectangle-logo.png"
    }

    update(){
        // vamos a dibujar con (CTX: contexto)

        //hacer que se mueva y hacer un loop infinito
        if(this.x < -canvas.width){
            this.x = 0;
        }
        //.drawImage recive 5 valores 1. imagen(this .img para agarrar todo el valor de img/2.this.x/3.this.y/4.this.width 
        //esto maneja .drawImage para un background estatico (por el momento)

        //HACER QUE SE MUEVA PARA LA IZQUIERDA CON X EN NEGATIVO
        this.x--
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        //dibujar una segunda imagen para el dibujo infinito
        ctx.drawImage(
            this.image,
            this.x + this.width, // empuje a mi imagen 2 al final de la imagen 1
            this.y,
            this.width,
            this.height
        )

    }
}

//CREACION DE FLAPPY (EL NOMBRE DE LA CLASS SIEMPRE EN MAYUSCULA)
class Flappy{
    /**
     * 
     * @param {number} x => pos x
     * @param {number} y => pos y
     * @param {number} w => width
     * @param {number} h => height
     */
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        //image
        this.image = new Image();
        this.image.src = "images/flappy.png"

        this.vy = 2//gravity
        this.userPull = 0; // fuerza del usuario
    }
    update(){
        //HACER QUE SE CAIGA EL FLAPPY
        //validamos gravedad contra userPull(presionar tecla space)
        this.vy = this.vy + (gravity - this.userPull)
        //Validamos que el flappy no se salga del canvas
        if(this.y <= 0){
           this.userPull = 0;
           this.y = 2;
           this.vy = 2 
        }
        
        // modificar su "Y" con la gravedad
        this.y += this.vy

        //dibujar!!!
        //.drawImage(img,x,y,w,h)
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
            )
    }
    collision(item){
        return(
            this.x < item.x + item.width &&
            this.x + this.width > item.x &&
            this.y < item.y + item.height &&
            this.y + this.height > item.y
        )
    }
}

// Pipes

class Pipe extends Flappy{
    /**
     * 
     * @param {string} pos = "top" | "bottom"
     * @param {number} x 
     * @param {number} y 
     * @param {number} h 
     */
    constructor(pos,x,y,h){

        super(x,y,50,h)
        /**
         * if(condicion){
         * ...
         * }else{
         *  ...false
         * }
         * ternario
         * ? => indica que es un if
         * : => else
         * (condicion) (?) (true) : (false)
         */

        this.image.src = 
        pos === "top"  // condicion
        ? "images/obstacle_top.png"
        : "images/obstacle_bottom.png";

    }

    update(){
        //move pipe
        this.x -= 2;
        // Dibujar pipe
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}
