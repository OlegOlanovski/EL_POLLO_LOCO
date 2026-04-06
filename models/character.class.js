class Character extends MovableObject {
  width = 160;
  height = 240;
  y = 85;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world;

  constructor() {
    super().loadimage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed; // Move to the right
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        //  wenn x=0 ist, damit der Charakter nicht aus dem Bildschirm läuft
        this.x -= this.speed; // Move to the left
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100; // Kamera folgt dem Charakter
    }, 1000 / 60); // 60 frames per second

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // Walking animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }
  jump() {}
}
