class DrawableObjekt {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;



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
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {    

    ctx.beginPath();
    ctx.lineWidth = '5';
    ctx.strokeStyle = 'blue';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    }
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
}