let canvas;
let world;
let keyboard = new Keyboard();
let startScreen;
let startButton;
let gameContainer;
let fullscreenButton;
let fullscreenExitButton;
let startControls;
let mobileControls;
let howToPlayOverlay;
let howToPlayButton;
let howToPlayCloseButton;
let muteButton;
let backgroundMusic = new Audio("audio/game-sound.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

/**
 * Initializes the game elements and binds mobile controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  startScreen = document.getElementById("startScreen");
  startButton = document.getElementById("startButton");
  gameContainer = document.querySelector(".game-container");
  fullscreenButton = document.getElementById("fullscreenButton");
  fullscreenExitButton = document.getElementById("fullscreenExitButton");
  startControls = document.getElementById("startControls");
  mobileControls = document.getElementById("mobileControls");
  howToPlayOverlay = document.getElementById("howToPlayOverlay");
  howToPlayButton = document.getElementById("howToPlayButton");
  howToPlayCloseButton = document.getElementById("howToPlayCloseButton");
  muteButton = document.getElementById("muteButton");
  bindMuteButton(muteButton, () => world, backgroundMusic);
  applyMuteStateToAudio(world, backgroundMusic);
  updateMuteButton(muteButton);
  bindHowToPlayDialog();
  bindMobileControls();
}

/**
 * Starts a new game when the current viewport allows gameplay.
 */
function startGame() {
  if (isGamePausedByOrientation()) {
    return;
  }
  if (world) {
    return;
  }
  if (!canvas) {
    init();
  }

  initLevel();
  startScreen?.classList.add("d-none");
  closeHowToPlay();
  document.querySelector(".site-footer")?.classList.add("d-none");
  playBackgroundMusic();
  world = new World(canvas, keyboard);
  applyMuteStateToAudio(world, backgroundMusic);

  console.log("My Character:", world.character);
}

/**
 * Starts the background music from the beginning.
 */
function playBackgroundMusic() {
  backgroundMusic.currentTime = 0;
  backgroundMusic.play().catch((error) => {
    console.log("Background music could not be played:", error);
  });
}

/**
 * Displays the win screen and schedules the reset.
 */
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

/**
 * Displays the lose screen and schedules the game-over screen.
 */
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

/**
 * Displays the game-over screen and schedules the reset.
 */
function showGameOverScreen() {
  startScreen?.classList.remove("lose-screen");
  startScreen?.classList.add("game-over-screen");

  setTimeout(() => {
    resetToStartScreen();
  }, 2500);
}

/**
 * Reloads the page to reset the game.
 */
function resetToStartScreen() {
  window.location.reload();
}

/**
 * Stops the background music and resets it to the beginning.
 */
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

/**
 * Requests fullscreen mode for the game container.
 */
function openFullscreen() {
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode when supported.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Updates the visible fullscreen control for the current fullscreen state.
 */
function updateFullscreenButton() {
  let isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

  fullscreenButton?.classList.toggle("d-none", isFullscreen);
  fullscreenExitButton?.classList.toggle("d-none", !isFullscreen);
}

document.addEventListener("fullscreenchange", updateFullscreenButton);
document.addEventListener("webkitfullscreenchange", updateFullscreenButton);

/**
 * Binds the instruction dialog controls.
 */
function bindHowToPlayDialog() {
  if (!howToPlayOverlay || !howToPlayButton || !howToPlayCloseButton) {
    return;
  }
  howToPlayButton.addEventListener("click", openHowToPlay);
  howToPlayCloseButton.addEventListener("click", closeHowToPlay);
  howToPlayOverlay.addEventListener("click", handleHowToPlayOverlayClick);
  document.addEventListener("keydown", handleHowToPlayKeyDown);
}

/**
 * Opens the instruction dialog.
 */
function openHowToPlay() {
  howToPlayOverlay?.classList.remove("d-none");
}

/**
 * Closes the instruction dialog.
 */
function closeHowToPlay() {
  howToPlayOverlay?.classList.add("d-none");
}

/**
 * Closes the instruction dialog when the backdrop is clicked.
 * @param {MouseEvent} event - Click event.
 */
function handleHowToPlayOverlayClick(event) {
  if (event.target === howToPlayOverlay) {
    closeHowToPlay();
  }
}

/**
 * Closes the instruction dialog when Escape is pressed.
 * @param {KeyboardEvent} event - Keyboard event.
 */
function handleHowToPlayKeyDown(event) {
  if (event.key === "Escape") {
    closeHowToPlay();
  }
}

/**
 * Checks whether the viewport is a blocked mobile portrait layout.
 * @returns {boolean} Result of the check.
 */
function isMobilePortrait() {
  return (
    window.matchMedia("(max-width: 760px)").matches &&
    window.innerHeight > window.innerWidth
  );
}

/**
 * Checks whether the device has a phone-sized touch viewport.
 * @returns {boolean} Result of the check.
 */
function isPhoneSizedTouchDevice() {
  let hasTouchInput = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  let hasPhoneViewport =
    window.matchMedia("(max-width: 760px)").matches ||
    window.matchMedia("(orientation: landscape) and (max-height: 760px)").matches;

  return hasTouchInput && hasPhoneViewport;
}

/**
 * Checks whether gameplay should pause because of orientation.
 * @returns {boolean} Result of the check.
 */
function isGamePausedByOrientation() {
  return isMobilePortrait();
}

/**
 * Clears all active keyboard states.
 */
function releaseKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

/**
 * Releases controls when the viewport switches to blocked portrait mode.
 */
function handleOrientationChange() {
  if (isMobilePortrait()) {
    releaseKeyboard();
  }
}

window.addEventListener("resize", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);

/**
 * Binds all mobile control buttons.
 */
function bindMobileControls() {
  if (!mobileControls) {
    return;
  }

  mobileControls.querySelectorAll("[data-key]").forEach(bindMobileControlButton);
}

/**
 * Binds pointer events for a mobile control button.
 * @param {HTMLButtonElement} button - Mobile control button.
 */
function bindMobileControlButton(button) {
  let key = button.dataset.key;
  button.addEventListener("pointerdown", (event) => setMobileKey(event, key, true));
  ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
    bindMobileKeyRelease(button, eventName, key);
  });
}

/**
 * Binds one pointer release event for a mobile control button.
 * @param {HTMLButtonElement} button - Mobile control button.
 * @param {string} eventName - Pointer event name.
 * @param {string} key - Keyboard state property.
 */
function bindMobileKeyRelease(button, eventName, key) {
  button.addEventListener(eventName, (event) => setMobileKey(event, key, false));
}

/**
 * Updates a keyboard state from a mobile control event.
 * @param {Event} event - Input event.
 * @param {string} key - Keyboard state property.
 * @param {boolean} isPressed - Whether the key is pressed.
 */
function setMobileKey(event, key, isPressed) {
  event.preventDefault();
  keyboard[key] = isPressed;
}

/**
 * Handles keyboard press events.
 * @param {Event} event - Input event.
 */
function handleKeyDown(event) {
  if (isHowToPlayOpen()) {
    return;
  }
  setKeyboardState(event.keyCode, true);
  if (event.keyCode == 13) {
    startGame();
  }
}

/**
 * Checks whether the instruction dialog is currently open.
 * @returns {boolean} Result of the check.
 */
function isHowToPlayOpen() {
  return Boolean(howToPlayOverlay && !howToPlayOverlay.classList.contains("d-none"));
}

/**
 * Handles keyboard release events.
 * @param {Event} event - Input event.
 */
function handleKeyUp(event) {
  setKeyboardState(event.keyCode, false);
}

/**
 * Updates the keyboard object for one key code.
 * @param {number} keyCode - Keyboard key code.
 * @param {boolean} isPressed - Whether the key is pressed.
 */
function setKeyboardState(keyCode, isPressed) {
  let key = resolveKeyboardKey(keyCode);
  if (key) {
    keyboard[key] = isPressed;
  }
}

/**
 * Maps a keyboard key code to a keyboard state property.
 * @param {number} keyCode - Keyboard key code.
 * @returns {string|undefined} Resolved value.
 */
function resolveKeyboardKey(keyCode) {
  let keys = {
    39: "RIGHT",
    37: "LEFT",
    38: "UP",
    40: "DOWN",
    32: "SPACE",
    68: "D",
  };
  return keys[keyCode];
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
