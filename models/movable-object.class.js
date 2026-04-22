class MovableObject extends DrawableObjekt {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.45;
  groundY = 180;
  gravityFrameRate = 1000 / 60;
  energy = 100;
  lastHit = 0;
  lastY = 0;
  hurtDuration = 1;
  gravityIntervalId;
  intervalIds = [];

  /**
   * Applies gravity to the movable object.
   */
  applyGravity() {
    this.gravityIntervalId = this.registerInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      if (this.isAboveGround() || this.speedY > 0) {
        this.lastY = this.y;
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.stopAtGround();
      }
    }, this.gravityFrameRate);
  }

  /**
   * Starts and tracks one interval.
   * @param {Function} callback - Interval callback.
   * @param {number} delay - Interval delay in milliseconds.
   * @returns {number} Interval identifier.
   */
  registerInterval(callback, delay) {
    let intervalId = setInterval(callback, delay);
    this.intervalIds.push(intervalId);
    return intervalId;
  }

  /**
   * Clears one tracked interval.
   * @param {number} intervalId - Interval identifier.
   */
  clearRegisteredInterval(intervalId) {
    if (!intervalId) {
      return;
    }
    clearInterval(intervalId);
    this.intervalIds = this.intervalIds.filter((id) => id !== intervalId);
  }

  /** Clears all tracked intervals. */
  clearAllIntervals() {
    this.intervalIds.forEach((intervalId) => clearInterval(intervalId));
    this.intervalIds = [];
    this.gravityIntervalId = null;
  }

  /** Stops falling exactly on the ground instead of overshooting it. */
  stopAtGround() {
    if (!this.isAboveGround() && this.speedY < 0) {
      this.y = this.getGroundY();
      this.speedY = 0;
    }
  }

  /**
   * Is game paused.
   * @returns {boolean} Result of the check.
   */
  isGamePaused() {
    return typeof isGamePausedByOrientation === "function" && isGamePausedByOrientation();
  }

  /**
   * Stops the gravity interval.
   */
  stopGravity() {
    this.clearRegisteredInterval(this.gravityIntervalId);
    this.gravityIntervalId = null;
  }

  /** Stops all media objects that belong to this instance. */
  stopAudio() {
    Object.values(this).forEach((value) => {
      if (value instanceof HTMLMediaElement) {
        value.pause();
        value.currentTime = 0;
      }
    });
  }

  /** Cleans up all active timers and audio on this instance. */
  destroy() {
    this.clearAllIntervals();
    this.stopAudio();
  }

  /**
   * Is above ground.
   * @returns {boolean} Result of the check.
   */
  isAboveGround() {
    return this.y < this.getGroundY();
  }

  /**
   * Returns the vertical ground position for this object.
   * @returns {number} Ground y-coordinate.
   */
  getGroundY() {
    return this.groundY;
  }

  // Checks whether this object collides with another movable object.
  /**
   * Is colliding.
   * @param {MovableObject} movableObject - Object to draw or transform.
   * @returns {boolean} Result of the check.
   */
  isColliding(movableObject) {
    return (
      this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
      this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
      this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
      this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
    );
  }

  /**
   * Reduces the object energy by the given damage amount.
   * @param {number} damage - Damage amount to apply.
   */
  hit(damage = 5) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0; // Energy cannot be negative.
    } else {
      this.lastHit = new Date().getTime(); // Timestamp of the last hit.
    }
  }

  /**
   * Is hurt.
   * @returns {boolean} Result of the check.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Time since the last hit.
    timePassed = timePassed / 1000; // Converts milliseconds to seconds.
    return timePassed < this.hurtDuration; // The object is hurt while the hurt duration has not passed.
  }

  /**
   * Is dead.
   * @returns {boolean} Result of the check.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Displays the next image of an animation sequence.
   * @param {string[]} images - Animation image paths.
   */
  playAnimation(images) {

    let i = this.currentImage % images.length; // let i = 7 % 6; => 1, remainder 1
    // let i = this.currentImage % 6; => 0,1,2,3,4,5,0,1,2,3,4,5,...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed; // Move to the right
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed; // Move to the left
  }

  /**
   * Starts a jump movement.
   */
  jump() {
    this.speedY = 13; // Jumping speed
  }
}
