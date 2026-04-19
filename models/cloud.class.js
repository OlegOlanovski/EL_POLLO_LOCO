class Cloud extends MovableObject {
  y = 20; // Clouds will be positioned at the top of the canvas
  width = 500;
  height = 250;
  resetX = 2600;

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/5_background/layers/4_clouds/1.png");

    this.x = x;
    this.y = Math.random() * 60;
    this.speed = 0.15 + Math.random() * 0.15;
    this.animate();
  }

  /**
   * Starts the animation intervals.
   */
  animate() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      this.moveLeft();
      if (this.x < -this.width) {
        this.x = this.resetX + Math.random() * 300;
      }
    }, 1000 / 60);
  }
}
