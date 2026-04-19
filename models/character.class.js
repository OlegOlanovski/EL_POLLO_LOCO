class Character extends MovableObject {
  width = 160;
  height = 240;
  y = 85;
  speed = 10;
  hurtDuration = 0.4;
  IMAGE_IDLE = "img/2_character_pepe/2_walk/W-21.png";
  offset = {
    top: 80,
    bottom: 10,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png", 
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

IMAGES_DEAD = [
  "img/2_character_pepe/5_dead/D-51.png",
  "img/2_character_pepe/5_dead/D-52.png",
  "img/2_character_pepe/5_dead/D-53.png",
  "img/2_character_pepe/5_dead/D-54.png",
  "img/2_character_pepe/5_dead/D-55.png",
  "img/2_character_pepe/5_dead/D-56.png",
  "img/2_character_pepe/5_dead/D-57.png",
  
]; 
IMAGES_HURT = [
  'img/2_character_pepe/4_hurt/H-41.png',
  'img/2_character_pepe/4_hurt/H-42.png',
  'img/2_character_pepe/4_hurt/H-43.png'
];

  world;
  jumping_sound = new Audio("audio/jumping.mp3");
  damage_sound = new Audio("audio/damage.mp3");
  attack_sound = new Audio("audio/attack.mp3");
  coin_sound = new Audio("audio/coin-sound.mp3");
  bottle_sound = new Audio("audio/bottle-sound.mp3");
  fire_sound = new Audio("audio/fire.mp3");
  jumping_sound_timeout;

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super().loadimage(this.IMAGE_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
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

      this.moveByKeyboard();
      this.jumpByKeyboard();
      this.updateCamera();
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

      this.playCurrentAnimation();
    }, 50);
  }

  /**
   * Moves the character based on keyboard input.
   */
  moveByKeyboard() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Starts a jump when the jump key is pressed.
   */
  jumpByKeyboard() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
  }

  /**
   * Updates the camera position to follow the character.
   */
  updateCamera() {
    this.world.camera_x = -this.x + 100; // Camera follows the character.
  }

  /**
   * Plays the animation that matches the current state.
   */
  playCurrentAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.showIdleImage();
    }
  }

  /**
   * Displays the idle image.
   */
  showIdleImage() {
    this.currentImage = 0;
    this.img = this.imageCache[this.IMAGE_IDLE];
  }

  /**
   * Starts a jump movement.
   */
  jump() {
    this.speedY = 30; // Jumping speed
    this.jumping_sound.currentTime = 0;
    this.jumping_sound.play();
    clearTimeout(this.jumping_sound_timeout);
    this.jumping_sound_timeout = setTimeout(() => {
      this.jumping_sound.pause();
      this.jumping_sound.currentTime = 0;
    }, 1000);
  }

  /**
   * Plays the damage sound.
   */
  playDamageSound() {
    this.damage_sound.currentTime = 0;
    this.damage_sound.play();
  }

  /**
   * Plays the attack sound.
   */
  playAttackSound() {
    this.attack_sound.currentTime = 0;
    this.attack_sound.play();
  }

  /**
   * Plays the coin pickup sound.
   */
  playCoinSound() {
    this.coin_sound.currentTime = 0;
    this.coin_sound.play();
  }

  /**
   * Plays the bottle pickup sound.
   */
  playBottleSound() {
    this.bottle_sound.currentTime = 0;
    this.bottle_sound.play();
  }

  /**
   * Plays the bottle throw sound.
   */
  playFireSound() {
    this.fire_sound.currentTime = 0;
    this.fire_sound.play();
  }
}
