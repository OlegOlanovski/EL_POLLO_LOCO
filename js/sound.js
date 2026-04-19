const MUTE_STORAGE_KEY = "elPolloLocoMuted";

/**
 * Reads the stored mute state.
 * @returns {boolean} Whether sound is muted.
 */
function isSoundMuted() {
  return localStorage.getItem(MUTE_STORAGE_KEY) === "true";
}

/**
 * Stores the mute state.
 * @param {boolean} isMuted - Whether sound should be muted.
 */
function storeSoundMuted(isMuted) {
  localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
}

/**
 * Toggles the stored mute state.
 * @returns {boolean} New mute state.
 */
function toggleStoredSoundMuted() {
  let isMuted = !isSoundMuted();
  storeSoundMuted(isMuted);
  return isMuted;
}

/**
 * Binds the mute button once.
 * @param {HTMLButtonElement} button - Mute button.
 * @param {Function} getWorld - Function that returns the current world.
 * @param {HTMLMediaElement} backgroundAudio - Background music.
 */
function bindMuteButton(button, getWorld, backgroundAudio) {
  if (!button || button.dataset.bound === "true") {
    return;
  }
  button.dataset.bound = "true";
  button.addEventListener("click", () => toggleMute(button, getWorld, backgroundAudio));
}

/**
 * Toggles mute and updates all audio objects.
 * @param {HTMLButtonElement} button - Mute button.
 * @param {Function} getWorld - Function that returns the current world.
 * @param {HTMLMediaElement} backgroundAudio - Background music.
 */
function toggleMute(button, getWorld, backgroundAudio) {
  toggleStoredSoundMuted();
  applyMuteStateToAudio(getWorld(), backgroundAudio);
  updateMuteButton(button);
}

/**
 * Updates one audio object.
 * @param {HTMLMediaElement} audio - Audio element to update.
 * @param {boolean} isMuted - Whether sound should be muted.
 */
function setAudioMuted(audio, isMuted) {
  if (audio instanceof HTMLMediaElement) {
    audio.muted = isMuted;
  }
}

/**
 * Applies mute state to all known game audio objects.
 * @param {World} gameWorld - Current game world.
 * @param {HTMLMediaElement} backgroundAudio - Background music.
 */
function applyMuteStateToAudio(gameWorld, backgroundAudio) {
  let isMuted = isSoundMuted();
  setAudioMuted(backgroundAudio, isMuted);
  collectWorldAudio(gameWorld).forEach((audio) => setAudioMuted(audio, isMuted));
}

/**
 * Collects audio objects from the current world.
 * @param {World} gameWorld - Current game world.
 * @returns {HTMLMediaElement[]} Audio objects.
 */
function collectWorldAudio(gameWorld) {
  if (!gameWorld) {
    return [];
  }
  return [
    ...collectObjectAudio(gameWorld.character),
    ...collectCollectionAudio(gameWorld.level?.enemies),
    ...collectCollectionAudio(gameWorld.throwabbleObjects),
  ];
}

/**
 * Collects audio objects from an array.
 * @param {Object[]} collection - Objects to scan.
 * @returns {HTMLMediaElement[]} Audio objects.
 */
function collectCollectionAudio(collection) {
  if (!collection) {
    return [];
  }
  return collection.flatMap(collectObjectAudio);
}

/**
 * Collects audio properties from one object.
 * @param {Object} source - Object to scan.
 * @returns {HTMLMediaElement[]} Audio objects.
 */
function collectObjectAudio(source) {
  if (!source) {
    return [];
  }
  return Object.values(source).filter((value) => value instanceof HTMLMediaElement);
}

/**
 * Updates the mute button state.
 * @param {HTMLButtonElement} button - Mute button.
 */
function updateMuteButton(button) {
  if (!button) {
    return;
  }
  let isMuted = isSoundMuted();
  button.classList.toggle("is-muted", isMuted);
  button.setAttribute("aria-pressed", String(isMuted));
  button.setAttribute("aria-label", isMuted ? "Sound einschalten" : "Sound ausschalten");
}
