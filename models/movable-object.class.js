class MovableObject extends DrawableObjekt {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

 


  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {    

    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    }
  }  

  // Überprüft, ob dieses Objekt mit einem anderen beweglichen Objekt kollidiert character.isColliding(enemy)
  isColliding(movableObject) {
    return (
      this.x + this.width > movableObject.x &&
      this.x < movableObject.x + movableObject.width &&
      this.y + this.height > movableObject.y &&
      this.y < movableObject.y + movableObject.height
    );
  }

  hit() {
    this.energy -= 5; 
    if (this.energy < 0) {
      this.energy = 0; // Energie kann nicht negativ sein
    } else {
      this.lastHit = new Date().getTime(); // Zeitstempel des letzten Treffers
    }
  }  

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Zeit seit dem letzten Treffer
    timePassed = timePassed / 1000; // Umwandeln in Sekunden
    return timePassed < 1; // Wenn weniger als 1 Sekunde vergangen ist, gilt das Objekt als verletzt  
  }

  isDead() {
    return this.energy === 0;
  } 





  playAnimation(images) {
    if (!images || images.length === 0) return;

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
