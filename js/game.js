let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;

function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("startScreen");
}

function startGame() {
  if (world) {
    return;
  }
  if (!canvas) {
    init();
  }

  startScreen?.classList.add("d-none");
  world = new World(canvas, keyboard);

  console.log("My Character:", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  } 
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  if (e.keyCode == 13) {
    startGame();
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
    if (e.keyCode == 68) {  
    keyboard.D = false;
  }
});
