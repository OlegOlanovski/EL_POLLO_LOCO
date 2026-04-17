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
  maxBottles = 5;
  coinAmount = 0;
  maxCoins = 5;
  gameFinished = false;
  enemyCollisionDamage = 20;
  enemyDamageCooldown = 500;
  lastEnemyDamage = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  run() {
    setInterval(() => { 
      this.checkCollisions();
      this.checkBottleCollisions();
      this.checkCoinCollisions();
      this.checkThrowObjects();
      this.checkThrowableObjectCollisions();
    }, 1000 / 60);  
  } 

  checkThrowObjects() {
   if (this.keyboard.D && this.bottleAmount > 0) { // Wenn die Taste "D" gedrückt wird, wird ein neues Wurfobjekt erstellt
      let bottleX = this.character.otherDirection ? this.character.x - 30 : this.character.x + 100;
      let throwableObject = new ThrowableObject(bottleX, this.character.y + 50, this.character.otherDirection); // Position des Wurfobjekts relativ zum Charakter
      this.throwabbleObjects.push(throwableObject); // Das neue Wurfobjekt wird zum Array hinzugefügt
      this.bottleAmount--;
      this.character.playFireSound();
      this.updateBottleStatusBar();
    }

    if (this.keyboard.D) {
      this.keyboard.D = false; // Verhindert, dass bei jedem Frame ein neues Objekt erstellt wird, solange die Taste gedrückt gehalten wird
    }
  }

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

  updateBottleStatusBar() {
    let percentage = (this.bottleAmount / this.maxBottles) * 100;
    this.bottleStatusBar.setPercentage(percentage);
  }

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

  updateCoinStatusBar() {
    let percentage = (this.coinAmount / this.maxCoins) * 100;
    this.coinStatusBar.setPercentage(percentage);
  }

  checkThrowableObjectCollisions() {
    let endboss = this.getEndboss();

    if (!endboss || endboss.isDead() || this.gameFinished) {
      return;
    }

    this.throwabbleObjects.forEach((throwableObject, index) => {
      if (throwableObject.isColliding(endboss)) {
        endboss.hit(20);
        this.endbossStatusBar.setPercentage(endboss.energy);
        this.throwabbleObjects.splice(index, 1);
        this.checkEndbossDefeated(endboss);
      }
    });
  }

  checkEndbossDefeated(endboss) {
    if (endboss.isDead()) {
      this.gameFinished = true;
      setTimeout(() => {
        showWinScreen();
      }, 1000);
    }
  }

  getEndboss() {
    return this.level.enemies.find((enemy) => enemy instanceof Endboss);
  }

  checkCollisions() { 
    if (this.gameFinished) {
      return;
    }

    this.level.enemies.forEach((enemy) => {
      if ((enemy instanceof Chicken && enemy.dead) || (enemy instanceof Endboss && enemy.isDead())) {
        return;
      }

      if (this.character.isColliding(enemy)) {
        if (enemy instanceof Chicken && this.isJumpingOnEnemy(enemy)) {
          this.killChicken(enemy);
        } else if (this.canTakeEnemyDamage()) {
          this.damageCharacter();
        }
      }
    });
  }

  canTakeEnemyDamage() {
    return new Date().getTime() - this.lastEnemyDamage > this.enemyDamageCooldown;
  }

  damageCharacter() {
    this.lastEnemyDamage = new Date().getTime();
    this.character.playDamageSound();
    this.character.hit(this.enemyCollisionDamage);
    this.statusBar.setPercentage(this.character.energy); // Aktualisiert den Statusbalken entsprechend der aktuellen Energie des Charakters
    this.checkCharacterDefeated();
  }

  checkCharacterDefeated() {
    if (this.character.isDead()) {
      this.gameFinished = true;
      setTimeout(() => {
        showLoseScreen();
      }, 1000);
    }
  }

  isJumpingOnEnemy(enemy) {
    let characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
    let previousCharacterBottom = this.character.lastY + this.character.height - this.character.offset.bottom;
    let enemyTop = enemy.y + enemy.offset.top;

    return this.character.speedY < 0 && previousCharacterBottom <= enemyTop && characterBottom >= enemyTop;
  }

  killChicken(chicken) {
    chicken.die();
    this.character.playAttackSound();
    this.character.speedY = 20;
    setTimeout(() => {
      let index = this.level.enemies.indexOf(chicken);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
      }
    }, 500);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // Alle folgenden Objekte werden um die Kamera verschoben
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwabbleObjects);
    this.ctx.translate(-this.camera_x, 0); // Alle folgenden Objekte werden zurückverschoben, damit die UI-Elemente an der richtigen Stelle bleiben
    //------- Space for fixed objects-------//
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);

    // Draw() wird immer wieder aufgerufen.
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx); // zeichnet das Objekt auf die Leinwand

    movableObject.drawFrame(this.ctx); // zeigt die Kollisionsboxen an

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
