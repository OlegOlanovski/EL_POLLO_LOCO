class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new instance and initializes its default state.
   * @param {string} imagePath - Path to the background image.
   * @param {number} x - Horizontal start position.
   */
  constructor(imagePath, x) {
    super().loadimage(imagePath);
    this.y = 480 - this.height; // Position the background at the bottom of the canvas
    this.x = x;
  }
}
