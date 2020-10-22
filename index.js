// const CUADRICULA = new Array(20).fill(0).map(()=>new Array(20))
/**
 * @enum {string} 'up' | 'down' | 'left' | 'right'
 */
const SQUARE_SIZE = 20;
const GRID_HEIGHT = 35;
const GRID_WIDTH = 20;
const UP = 'up';
const DOWN = 'down';
const RIGHT = 'right';
const LEFT = 'left';


let counter = 0;

class SnakeSquare {
  constructor(life = 3, isHead = false, initialPosition = [0, 0]) {
    this.life = life;
    this.isHead = isHead;
    this.position = initialPosition;
    this.counter = counter++;
  }

  draw() {
    // vamos a dibujar un cuadrito
    if (this.isHead) {
      fill('#222222');
    } else {
      fill('#fff');
    }
    square(
      this.position[0] * SQUARE_SIZE,
      this.position[1] * SQUARE_SIZE,
      SQUARE_SIZE
    );
  }

  update() {
    // si la vida es 0, vamo' a destruir
    this.life = this.life - 1;
    // console.log('vida de ', this.counter, ' es ', this.life)
    // Checkear si hay colision con la comida

    // si el cuadrito is head, creamos otro cuadrito y decimos que es head



    // quitarle vida

    // llamar a draw

  }

  destroy() {
    // aqui eliminamos el cuadrito
  }

  createHead() {
    // aqui creo otro cuadrito
  }
}

class FoodGenerator{
  constructor(){
    this.position = [10, 10];
  }

  update(){
    
  }
}

class Snake {
  constructor() {
    this.futureDirection = DOWN;
    this.direction = DOWN;
    this.long = 4;

    this.squares = [
      new SnakeSquare(4, true, [0, 2])
    ]
    this.head = this.squares[0];
  }

  update() {
    // iterar por cada uno de los cuadritos
    this.squares.forEach((cuadrito, index) => {
      cuadrito.update();
      if (cuadrito.life == 0) {
        this.squares.splice(index, 1);
      } else {
        cuadrito.draw();
      }
    });

    this.updateHead();
    // console.log(this.squares);
    console.log('la direccion de la snake ', this.direction)
    //   revisar si hay colisiones con la cabeza, en ese caso morir
  }

  updateHead() {
    this.direction = this.futureDirection;
    const x = this.head.position[0];
    const y = this.head.position[1];

    let newX = x;
    if (this.direction===LEFT){
      newX = x -1;
    } else if (this.direction === RIGHT){
      console.log('MUEVASE A LA DERECHA')
      newX = x + 1;
    }

    let newY = y;
    if (this.direction===UP){
      newY = y - 1;
    } else if (this.direction === DOWN){
      newY = y + 1;
    }

    console.log('new X: ', newX, 'newY: ', newY, 'direccion:', this.direction);

    this.head.isHead = false;

    this.head = new SnakeSquare(
      this.long,
      true,
      [newX, newY]
    );

    this.squares.push(this.head);
  }

  changeDirection(direction) {
    if (this.direction === UP && direction === DOWN) {
      return;
    };
    if (this.direction === DOWN && direction === UP) {
      return;
    };
    if (this.direction === LEFT && direction === RIGHT) {
      return;
    }
    if (this.direction === RIGHT && direction === LEFT) {
      return;
    }


    this.futureDirection = direction;
  }
}



/**
 * Inicializa la culebrita
 * 
 */
function initSnake(cuadricula, startPositions) {

  // cuadricula[10]
}
// const prueba = new SnakeSquare();
let snake;


function setup() {
  frameRate(3);
  const canvasWidth = SQUARE_SIZE * GRID_WIDTH;
  const canvasHeight = SQUARE_SIZE * GRID_HEIGHT;
  createCanvas(canvasWidth, canvasHeight);
  background(153);

  snake = new Snake();

}

function draw() {
  background(153);
  snake.update();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.changeDirection(LEFT);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(RIGHT);
  } else if (keyCode === UP_ARROW) {
    snake.changeDirection(UP);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(DOWN);
  }
}