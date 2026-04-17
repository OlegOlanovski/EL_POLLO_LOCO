let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let startButton;
let gameContainer;
let fullscreenButton;
let fullscreenExitButton;
let startControls;
let backgroundMusic = new Audio("audio/game-sound.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("startScreen");
  startButton = document.getElementById("startButton");
  gameContainer = document.querySelector(".game-container");
  fullscreenButton = document.getElementById("fullscreenButton");
  fullscreenExitButton = document.getElementById("fullscreenExitButton");
  startControls = document.getElementById("startControls");
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

function showWinScreen() {
  stopBackgroundMusic();
  canvas?.classList.add("d-none");
  startScreen?.classList.remove("d-none");
  startScreen?.classList.add("final-screen");
  startScreen?.classList.add("win-screen");
  startButton?.classList.add("d-none");

  setTimeout(() => {
    resetToStartScreen();
  }, 4000);
}

function showLoseScreen() {
  stopBackgroundMusic();
  canvas?.classList.add("d-none");
  startScreen?.classList.remove("d-none");
  startScreen?.classList.add("final-screen");
  startScreen?.classList.add("lose-screen");
  startButton?.classList.add("d-none");

  setTimeout(() => {
    showGameOverScreen();
  }, 2500);
}

function showGameOverScreen() {
  startScreen?.classList.remove("lose-screen");
  startScreen?.classList.add("game-over-screen");

  setTimeout(() => {
    resetToStartScreen();
  }, 2500);
}

function resetToStartScreen() {
  window.location.reload();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

function openFullscreen() {
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function updateFullscreenButton() {
  let isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

  fullscreenButton?.classList.toggle("d-none", isFullscreen);
  fullscreenExitButton?.classList.toggle("d-none", !isFullscreen);
}

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

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
