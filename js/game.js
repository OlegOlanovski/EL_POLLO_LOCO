let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let backgroundMusic = new Audio("audio/game-sound.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

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

  initLevel();
  startScreen?.classList.add("d-none");
  playBackgroundMusic();
  world = new World(canvas, keyboard);

  console.log("My Character:", world.character);
}

function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch((error) => {
    console.log("Background music could not be played:", error);
  });
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
