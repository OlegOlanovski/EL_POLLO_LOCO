class Cloud extends MovableObject {
  y = 20; // Clouds will be positioned at the top of the canvas
  width = 500;
  height = 250;

  constructor() {
    super().loadimage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500; // Random y position for the cloud
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15; // Move the cloud to the left
    }, 1000 / 60); // 60 frames per second
  }
}
