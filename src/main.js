let snake = undefined;
let food = undefined;
let numberOfRows = 80;
let numberOfCols = 160;
let animator = undefined;

//lines added. vvv
const doesHittedToSideEdges = function(head) {
  return head.x == 0||head.x==numberOfCols-1;
}

const doesHittedToUpperOrLowerEdges=function(head){
  return head.y==numberOfRows-1||head.y==0;
}

const hittedWall = function(head) {
  return doesHittedToSideEdges(head)||doesHittedToUpperOrLowerEdges(head)
}

const isGameOver = function(head) {
  return hittedWall(head)||snake.hasEatenItSelf();
}

const resetTheGame=function(){
  clearInterval(animator);
  location.reload();
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
    clearInterval(animator);
    document.getElementById('restart').style='visibility:visible'
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
