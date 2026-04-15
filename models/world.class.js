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
  throwabbleObjects = [];

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
  }

  run() {
    setInterval(() => { 
      this.checkCollisions();
      this.checkThrowObjects();
    
      
     
    }, 200);  
  } 

  checkThrowObjects() {
   if (this.keyboard.D) { // Wenn die Taste "D" gedrückt wird, wird ein neues Wurfobjekt erstellt
      let throwableObject = new ThrowableObject(this.character.x + 50, this.character.y + 50); // Position des Wurfobjekts relativ zum Charakter
      this.throwabbleObjects.push(throwableObject); // Das neue Wurfobjekt wird zum Array hinzugefügt
      this.keyboard.D = false; // Verhindert, dass bei jedem Frame ein neues Objekt erstellt wird, solange die Taste gedrückt gehalten wird
    }
  }

  checkCollisions() { 
    this.level.enemies.forEach((enemy) => {
    if (this.character.isColliding(enemy)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy); // Aktualisiert den Statusbalken entsprechend der aktuellen Energie des Charakters

     
      
    }
  });
}

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // Alle folgenden Objekte werden um die Kamera verschoben
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0); // Alle folgenden Objekte werden zurückverschoben, damit die UI-Elemente an der richtigen Stelle bleiben
    //------- Space for fixed objects-------//
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.ctx.translate(this.camera_x, 0); // Alle folgenden Objekte werden um die Kamera verschoben
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwabbleObjects);
    this.ctx.translate(-this.camera_x, 0); // Alle folgenden Objekte werden zurückverschoben, damit die UI-Elemente an der richtigen Stelle bleiben

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
