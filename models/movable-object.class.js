class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

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

  loadimage(path) {
    this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>;
    this.img.src = path;
  }

  draw(ctx) {
      ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  /**
   *
   * @param {Array} arr - ["img/1_character_pepe/1_walk/W-21.png", "img/1_character_pepe/1_walk/W-22.png", ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = "transform: scaleX(-1)"; // Spiegeln des Bildes
      this.imageCache[path] = img;
    });
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
