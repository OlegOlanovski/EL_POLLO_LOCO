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

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages([this.IMAGE_DEAD]);

    this.x = x || 200 + Math.random() * 500; // Random x position for the chicken
    this.speed = 0.15 + Math.random() * 0.5; // Random speed for the chicken
    this.animate();
  }

  /**
   * Starts the animation intervals.
   */
  animate() {
    this.animateMovement();
    this.animateImages();
  }

  /**
   * Starts the movement animation interval.
   */
  animateMovement() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60); // 60 frames per second
  }

  /**
   * Starts the image animation interval.
   */
  animateImages() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  /**
   * Marks the chicken as dead and displays its dead image.
   */
  die() {
    this.dead = true;
    this.img = this.imageCache[this.IMAGE_DEAD];
  }
}

class SmallChicken extends Chicken {
  y = 380;
  height = 40;
  width = 40;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super(x);
    this.loadimage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages([this.IMAGE_DEAD]);
    this.speed = 0.3 + Math.random() * 0.6;
  }
}
