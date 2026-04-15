class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 60;
  dead = false;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor(x) {
    super().loadimage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages([this.IMAGE_DEAD]);

    this.x = x || 200 + Math.random() * 500; // Random x position for the chicken
    this.speed = 0.15 + Math.random() * 0.5; // Random speed for the chicken
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60); // 60 frames per second

    setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  die() {
    this.dead = true;
    this.img = this.imageCache[this.IMAGE_DEAD];
  }
}
