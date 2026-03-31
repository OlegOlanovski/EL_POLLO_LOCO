class Cloud extends MovableObject {
  y = 20; // Clouds will be positioned at the top of the canvas
  width = 500;
  height = 250;

  constructor() {
    super().loadimage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500; // Random y position for the cloud
  }
}
