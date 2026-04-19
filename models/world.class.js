class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  coinStatusBar = new StatusbarCoin();
  bottleStatusBar = new StatusbarBottle();
  endbossStatusBar = new StatusbarEndboss();
  throwabbleObjects = [];
  bottleAmount = 0;
  maxBottles = 7;
  coinAmount = 0;
  maxCoins = 5;
  gameFinished = false;
  enemyCollisionDamage = 20;
  endbossBottleDamage = 34;
  enemyDamageCooldown = 500;
  lastEnemyDamage = 0;

  /**
   * Creates a new instance and initializes its default state.
   * @param {HTMLCanvasElement} canvas - Game canvas element.
   * @param {Keyboard} keyboard - Keyboard state object.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /** Assigns the world reference to objects that need it. */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /** Starts the recurring world update loop. */
  run() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }
      this.checkCollisions();
      this.checkBottleCollisions();
      this.checkCoinCollisions();
      this.checkThrowObjects();
      this.checkThrowableObjectCollisions();
      this.removeFinishedThrowableObjects();
    }, 1000 / 60);
  }

  /**
   * Is game paused.
   * @returns {boolean} Result of the check.
   */
  isGamePaused() {
    return typeof isGamePausedByOrientation === "function" && isGamePausedByOrientation();
  }

  /** Checks whether the character throws a bottle. */
  checkThrowObjects() {
   if (this.keyboard.D && this.canThrowBottle()) { // Creates a new throwable object when the D key is pressed.
      let bottleX = this.character.otherDirection ? this.character.x - 30 : this.character.x + 100;
      let throwableObject = new ThrowableObject(bottleX, this.character.y + 50, this.character.otherDirection); // Position relative to the character.
      this.throwabbleObjects.push(throwableObject); // Adds the throwable object to the array.
      this.bottleAmount--;
      this.character.playFireSound();
      this.updateBottleStatusBar();
    }
    if (this.keyboard.D) {
      this.keyboard.D = false; // Prevents creating a new object every frame while the key is held.
    }
  }

  /**
   * Can throw bottle.
   * @returns {boolean} Result of the check.
   */
  canThrowBottle() {
    return this.bottleAmount > 0 && this.throwabbleObjects.length === 0;
  }

  /** Checks bottle pickup collisions. */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.bottles.splice(index, 1);
        this.bottleAmount++;
        this.character.playBottleSound();
        this.updateBottleStatusBar();
      }
    });
  }

  /** Updates the bottle status bar. */
  updateBottleStatusBar() {
    let percentage = (this.bottleAmount / this.maxBottles) * 100;
    this.bottleStatusBar.setPercentage(percentage);
  }

  /** Checks coin pickup collisions. */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.coinAmount++;
        this.character.playCoinSound();
        this.updateCoinStatusBar();
      }
    });
  }

  /** Updates the coin status bar. */
  updateCoinStatusBar() {
    let percentage = (this.coinAmount / this.maxCoins) * 100;
    this.coinStatusBar.setPercentage(percentage);
  }

  /** Checks all thrown bottle collisions. */
  checkThrowableObjectCollisions() {
    let endboss = this.getEndboss();
    if (this.gameFinished) {
      return;
    }
    this.throwabbleObjects.forEach((throwableObject) => {
      this.checkThrowableObjectCollision(throwableObject, endboss);
    });
  }

  /**
   * Checks one thrown bottle collision.
   * @param {ThrowableObject} throwableObject - Thrown bottle to check.
   * @param {Endboss} endboss - Endboss instance to check.
   */
  checkThrowableObjectCollision(throwableObject, endboss) {
    if (throwableObject.isSplashing) {
      return;
    }
    if (this.checkThrowableObjectHitsChicken(throwableObject)) {
      return;
    }
    this.checkThrowableObjectHitsEndboss(throwableObject, endboss);
  }

  /**
   * Checks whether a thrown bottle hits the endboss.
   * @param {ThrowableObject} throwableObject - Thrown bottle to check.
   * @param {Endboss} endboss - Endboss instance to check.
   */
  checkThrowableObjectHitsEndboss(throwableObject, endboss) {
    if (!endboss || endboss.isDead() || !throwableObject.isColliding(endboss)) {
      return;
    }
    endboss.hit(this.endbossBottleDamage);
    this.endbossStatusBar.setPercentage(endboss.energy);
    throwableObject.splash(() => this.removeThrowableObject(throwableObject));
    this.checkEndbossDefeated(endboss);
  }

  /**
   * Checks whether a thrown bottle hits a chicken.
   * @param {ThrowableObject} throwableObject - Thrown bottle to check.
   * @returns {boolean} Result of the check.
   */
  checkThrowableObjectHitsChicken(throwableObject) {
    let chicken = this.level.enemies.find((enemy) => enemy instanceof Chicken && !enemy.dead && throwableObject.isColliding(enemy));
    if (!chicken) {
      return false;
    }
    this.killChickenWithBottle(chicken);
    throwableObject.splash(() => this.removeThrowableObject(throwableObject));
    return true;
  }

  /**
   * Removes a thrown bottle from the world.
   * @param {ThrowableObject} throwableObject - Thrown bottle to check.
   */
  removeThrowableObject(throwableObject) {
    let index = this.throwabbleObjects.indexOf(throwableObject);
    if (index > -1) {
      this.throwabbleObjects.splice(index, 1);
    }
  }

  /** Removes thrown bottles that finished their splash animation. */
  removeFinishedThrowableObjects() {
    this.throwabbleObjects = this.throwabbleObjects.filter((throwableObject) => !throwableObject.isFinished);
  }

  /**
   * Checks whether the endboss was defeated.
   * @param {Endboss} endboss - Endboss instance to check.
   */
  checkEndbossDefeated(endboss) {
    if (endboss.isDead()) {
      this.gameFinished = true;
      setTimeout(() => {
        showWinScreen();
      }, 1000);
    }
  }

  /**
   * Returns the endboss from the current level.
   * @returns {Endboss|undefined} Resolved value.
   */
  getEndboss() {
    return this.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  /** Checks all character enemy collisions. */
  checkCollisions() {
    if (this.gameFinished) {
      return;
    }
    this.level.enemies.forEach((enemy) => {
      this.checkEnemyCollision(enemy);
    });
  }

  /**
   * Checks one character enemy collision.
   * @param {MovableObject} enemy - Enemy to check.
   */
  checkEnemyCollision(enemy) {
    if (this.shouldIgnoreEnemy(enemy) || !this.character.isColliding(enemy)) {
      return;
    }
    if (enemy instanceof Chicken && this.isJumpingOnEnemy(enemy)) {
      this.killChicken(enemy);
    } else if (this.canTakeEnemyDamage()) {
      this.damageCharacter();
    }
  }

  /**
   * Should ignore enemy.
   * @param {MovableObject} enemy - Enemy to check.
   * @returns {boolean} Result of the check.
   */
  shouldIgnoreEnemy(enemy) {
    return (enemy instanceof Chicken && enemy.dead) || (enemy instanceof Endboss && enemy.isDead());
  }

  /**
   * Can take enemy damage.
   * @returns {boolean} Result of the check.
   */
  canTakeEnemyDamage() {
    return new Date().getTime() - this.lastEnemyDamage > this.enemyDamageCooldown;
  }

  /** Damages the character and updates the health bar. */
  damageCharacter() {
    this.lastEnemyDamage = new Date().getTime();
    this.character.playDamageSound();
    this.character.hit(this.enemyCollisionDamage);
    this.statusBar.setPercentage(this.character.energy); // Updates the status bar with the character's current energy.
    this.checkCharacterDefeated();
  }

  /** Checks whether the character was defeated. */
  checkCharacterDefeated() {
    if (this.character.isDead()) {
      this.gameFinished = true;
      setTimeout(() => {
        showLoseScreen();
      }, 1000);
    }
  }

  /**
   * Is jumping on enemy.
   * @param {MovableObject} enemy - Enemy to check.
   * @returns {boolean} Result of the check.
   */
  isJumpingOnEnemy(enemy) {
    let characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
    let previousCharacterBottom = this.character.lastY + this.character.height - this.character.offset.bottom;
    let enemyTop = enemy.y + enemy.offset.top;
    return this.character.speedY < 0 && previousCharacterBottom <= enemyTop && characterBottom >= enemyTop;
  }

  /**
   * Kills a chicken after the character jumps on it.
   * @param {Chicken} chicken - Chicken to update or remove.
   */
  killChicken(chicken) {
    chicken.die();
    this.character.playAttackSound();
    this.character.speedY = 20;
    this.removeChickenAfterDelay(chicken);
  }

  /**
   * Kills a chicken after a bottle hit.
   * @param {Chicken} chicken - Chicken to update or remove.
   */
  killChickenWithBottle(chicken) {
    chicken.die();
    this.removeChickenAfterDelay(chicken);
  }

  /**
   * Removes a dead chicken after a short delay.
   * @param {Chicken} chicken - Chicken to update or remove.
   */
  removeChickenAfterDelay(chicken) {
    setTimeout(() => {
      let index = this.level.enemies.indexOf(chicken);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 500);
  }

  /** Draws the object on the canvas. */
  draw() {
    this.clearCanvas();
    this.drawMovableObjects();
    this.drawFixedObjects();
    this.requestDrawFrame();
  }

  /** Clears the complete canvas. */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Draws all camera-relative objects. */
  drawMovableObjects() {
    this.ctx.translate(this.camera_x, 0); // Moves all following objects by the camera offset.
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwabbleObjects);
    this.ctx.translate(-this.camera_x, 0); // Resets the camera offset so UI elements stay in place.
  }

  /** Draws fixed UI objects. */
  drawFixedObjects() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);
  }

  /** Requests the next draw frame. */
  requestDrawFrame() {
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Draws all objects in a collection.
   * @param {MovableObject[]} objects - Objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws one object on the map.
   * @param {MovableObject} movableObject - Object to draw or transform.
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx); // Draws the object on the canvas.
    movableObject.drawFrame(this.ctx); // Shows the collision boxes.
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**
   * Flips an object before drawing it.
   * @param {MovableObject} movableObject - Object to draw or transform.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Restores an object after flipped drawing.
   * @param {MovableObject} movableObject - Object to draw or transform.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
