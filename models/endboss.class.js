class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  baseY = 50;
  dead = false;
  speed = 4;
  minSpeed = 4;
  maxSpeed = 8;
  speedChange = 0.04;
  isSpeedingUp = true;
  isJumping = false;
  jumpSpeedY = 0;
  jumpStrength = 16;
  jumpGravity = 0.8;
  jumpDelay = 1600;
  lastJumpTime = 0;
  startX = 2500;
  patrolDistance = 450;
  isMovingForward = true;
  attackDistance = 130;
  world;
  panic_sound = new Audio("audio/panic.mp3");
  hasPlayedPanicSound = false;
  isActive = false;
  offset = {
    top: 60,
    bottom: 20,
    left: 20,
    right: 30,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super().loadimage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = this.startX;
    this.lastJumpTime = new Date().getTime();
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

      this.activateEndboss();
      this.moveWhenReady();
    }, 1000 / 60);
  }

  /**
   * Starts the image animation interval.
   */
  animateImages() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      if (!this.isActive) {
        return;
      }

      this.playCurrentAnimation();
    }, 200);
  }

  /**
   * Move when ready.
   */
  moveWhenReady() {
    if (!this.isActive) {
      return;
    }
    this.checkPanicSound();
    this.updateJump();
    this.patrol();
  }

  /**
   * Plays the animation that matches the current state.
   */
  playCurrentAnimation() {
    if (this.isDead()) {
      this.dead = true;
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAttacking()) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Activates the endboss when it becomes visible.
   */
  activateEndboss() {
    if (!this.isActive && this.isVisibleOnScreen()) {
      this.isActive = true;
    }
  }

  /**
   * Plays the panic sound once when the endboss appears.
   */
  checkPanicSound() {
    if (!this.hasPlayedPanicSound && !this.isDead() && this.isVisibleOnScreen()) {
      this.playPanicSound();
    }
  }

  /**
   * Checks whether the endboss is visible on the canvas.
   * @returns {boolean} Result of the check.
   */
  isVisibleOnScreen() {
    if (!this.world) {
      return false;
    }

    let screenLeft = this.x + this.world.camera_x;
    let screenRight = screenLeft + this.width;
    return screenRight > 0 && screenLeft < this.world.canvas.width;
  }

  /**
   * Plays the endboss panic sound.
   */
  playPanicSound() {
    this.hasPlayedPanicSound = true;
    this.panic_sound.currentTime = 0;
    this.panic_sound.play().catch((error) => {
      console.log("Panic sound could not be played:", error);
    });
  }

  /**
   * Moves the endboss along its patrol path.
   */
  patrol() {
    if (this.isDead() || this.isAttacking()) { // Endboss does not move while dead or attacking.
      return;
    }

    this.updatePatrolSpeed();

    if (this.isMovingForward && this.x > this.startX - this.patrolDistance) {
      this.walkForward();
    } else if (!this.isMovingForward && this.x < this.startX) {
      this.walkBack();
    } else {
      this.x = this.isMovingForward ? this.startX - this.patrolDistance : this.startX;
      this.isMovingForward = !this.isMovingForward;
    }
  }

  /**
   * Updates the endboss jump movement.
   */
  updateJump() {
    if (this.shouldStartJump()) {
      this.startJump();
    }
    if (this.isJumping) {
      this.y -= this.jumpSpeedY;
      this.jumpSpeedY -= this.jumpGravity;
      this.landAfterJump();
    }
  }

  /**
   * Checks whether the endboss should start a jump.
   * @returns {boolean} Result of the check.
   */
  shouldStartJump() {
    return (
      !this.isJumping &&
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAttacking() &&
      new Date().getTime() - this.lastJumpTime > this.jumpDelay
    );
  }

  /**
   * Starts a jump movement.
   */
  startJump() {
    this.isJumping = true;
    this.jumpSpeedY = this.jumpStrength;
  }

  /**
   * Stops the jump when the endboss reaches the ground again.
   */
  landAfterJump() {
    if (this.y < this.baseY) {
      return;
    }
    this.y = this.baseY;
    this.isJumping = false;
    this.lastJumpTime = new Date().getTime();
  }

  /**
   * Changes the patrol speed between slow and fast.
   */
  updatePatrolSpeed() {
    if (this.isSpeedingUp) {
      this.speed += this.speedChange;
    } else {
      this.speed -= this.speedChange;
    }

    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed;
      this.isSpeedingUp = false;
    } else if (this.speed <= this.minSpeed) {
      this.speed = this.minSpeed;
      this.isSpeedingUp = true;
    }
  }

  /**
   * Moves the endboss forward on its patrol path.
   */
  walkForward() {
    this.moveLeft();
    this.otherDirection = false;
  }

  /**
   * Moves the endboss back on its patrol path.
   */
  walkBack() {
    this.moveRight();
    this.otherDirection = true;
  }

  /**
   * Is attacking.
   * @returns {boolean} Result of the check.
   */
  isAttacking() {
    return this.world && this.getDistanceToCharacter() < this.attackDistance;
  }

  /**
   * Calculates the horizontal distance to the character.
   * @returns {number} Calculated numeric value.
   */
  getDistanceToCharacter() {
    return Math.abs(this.getCenterX() - this.getCharacterCenterX());
  }

  /**
   * Calculates the horizontal center of the object.
   * @returns {number} Calculated numeric value.
   */
  getCenterX() {
    return this.x + this.width / 2;
  }

  /**
   * Calculates the horizontal center of the character.
   * @returns {number} Calculated numeric value.
   */
  getCharacterCenterX() {
    return this.world.character.x + this.world.character.width / 2;
  }
}
