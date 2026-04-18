class Cloud extends MovableObject {
  y = 20; // Clouds will be positioned at the top of the canvas
  width = 500;
  height = 250;
  resetX = 2600;

  constructor(x) {
    super().loadimage("img/5_background/layers/4_clouds/1.png");

    this.x = x;
    this.y = Math.random() * 60;
    this.speed = 0.15 + Math.random() * 0.15;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x < -this.width) {
        this.x = this.resetX + Math.random() * 300;
      }
    }, 1000 / 60);
  }
}
