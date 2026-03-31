class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath, x) {
    super().loadimage(imagePath);
    this.y = 480 - this.height; // Position the background at the bottom of the canvas
    this.x = x;
  }
}
