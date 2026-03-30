class BackgroundObject extends MovableObject {
  width = 720;
  hight = 480;

  constructor(imagePath, x) {
    super().loadimage(imagePath);
    this.y = 480 - this.hight; // Position the background at the bottom of the canvas
    this.x = x;
  }
}
