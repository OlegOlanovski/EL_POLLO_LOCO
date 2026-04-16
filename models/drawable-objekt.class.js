class DrawableObjekt {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };



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
    ctx.rect(
      this.x + this.offset.left,
      this.y + this.offset.top,
      this.width - this.offset.left - this.offset.right,
      this.height - this.offset.top - this.offset.bottom
    );
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
