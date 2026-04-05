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

  loadimage(path) {
    this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>;
    this.img.src = path;
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
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed; // Move to the left
    }, 1000 / 60); // 60 frames per second
  }
}
