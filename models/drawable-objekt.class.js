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

    /**
     * Loads an image from the given path.
     * @param {string} path - Path to the image file.
     */
    loadimage(path) {
        this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>;
        this.img.src = path;
      }

      /**
       * Draws the object on the canvas.
       * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
       */
      draw(ctx) {
        ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

  /**
   * Draws the collision frame for debugging.
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
   */
  drawFrame(ctx) {
  }

  /**
   * Loads multiple image paths into the image cache.
   * @param {string[]} arr - Image paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = "transform: scaleX(-1)"; // Mirrors the image.
      this.imageCache[path] = img;
    });
  }
}
