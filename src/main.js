let snake = undefined;
let food = undefined;
let numberOfRows = 60;
let numberOfCols = 120;
let animator = undefined;

//lines added. vvv
const doesHittedToSideEdges = function(head) {
  return head.x == -1||head.x==120;
}
const doesHittedToUpperOrLowerEdges=function(head){
  return head.y==60||head.y==-1;
}

const hittedWall = function(head) {
  return doesHittedToSideEdges(head)||doesHittedToUpperOrLowerEdges(head)
}
const isGameOver = function(head, tail) {
  console.log('its working');
  return hittedWall(head) //||eatenItSelf(head,tail);
}



const animateSnake = function() {
  let oldHead = snake.getHead();
  let oldTail = snake.move();
  let head = snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if (head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows, numberOfCols);
    drawFood(food);
  }

  //lines added. vvv
  if (isGameOver(head)) {
    alert('GameOver')
  }
}

const changeSnakeDirection = function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener = function() {
  let grid = document.getElementById("keys");
  grid.onkeyup = changeSnakeDirection;
  grid.focus();
}

const createSnake = function() {
  let tail = new Position(12, 10, "east");
  let body = [];
  body.push(tail);
  body.push(tail.next());
  let head = tail.next().next();

  snake = new Snake(head, body);
}

const createFood = function(numberOfRows, numberOfCols) {
  food = generateRandomPosition(numberOfCols, numberOfRows);
}

const startGame = function() {
  createSnake();
  drawGrids(numberOfRows, numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows, numberOfCols);
  drawFood(food);
  addKeyListener();
  animator = setInterval(animateSnake, 140);
}

window.onload = startGame;
