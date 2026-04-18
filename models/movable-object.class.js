class MovableObject extends DrawableObjekt {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  lastY = 0;
  hurtDuration = 1;
  gravityIntervalId;

  applyGravity() {
    this.gravityIntervalId = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.lastY = this.y;
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  stopGravity() {
    clearInterval(this.gravityIntervalId);
    this.gravityIntervalId = null;
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) { // ThrowableObjects können nicht unter die Erde fallen
      return true; 
    } else {
      return this.y < 180; // Andere Objekte sind über dem Boden, wenn y < 180
    }

   
  }

 



  // Überprüft, ob dieses Objekt mit einem anderen beweglichen Objekt kollidiert character.isColliding(enemy)
  isColliding(movableObject) {
    return (
      this.x + this.width - this.offset.right > movableObject.x + movableObject.offset.left &&
      this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
      this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
      this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
    );
  }

  hit(damage = 5) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0; // Energie kann nicht negativ sein
    } else {
      this.lastHit = new Date().getTime(); // Zeitstempel des letzten Treffers
    }
  }  

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Zeit seit dem letzten Treffer
    timePassed = timePassed / 1000; // Umwandeln in Sekunden
    return timePassed < this.hurtDuration; // Wenn weniger als hurtDuration vergangen ist, gilt das Objekt als verletzt
  }

  isDead() {
    return this.energy === 0;
  } 





  playAnimation(images) {
    

    let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
    // let i = this.currentImage % 6; => 0,1,2,3,4,5,0,1,2,3,4,5,...
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed; // Move to the right
  }

  moveLeft() {
    this.x -= this.speed; // Move to the left
  }

  jump() {
    this.speedY = 30; // Jumping speed
  }
}
