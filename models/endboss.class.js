class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  dead = false;
  speed = 5;
  startX = 2500;
  patrolDistance = 450;
  isMovingForward = true;
  attackDistance = 130;
  world;
  panic_sound = new Audio("audio/panic.mp3");
  hasPlayedPanicSound = false;
  isActive = false;
  hasStartedPatrol = false;
  patrolStartDelay = 2000;
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

  constructor() {
    super().loadimage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = this.startX;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      this.activateEndboss();
      if (!this.isActive) {
        return;
      }
      this.checkPanicSound();
      if (!this.hasStartedPatrol) {
        return;
      }
      this.patrol();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isGamePaused()) {
        return;
      }

      if (!this.isActive || !this.hasStartedPatrol) {
        return;
      }

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
    }, 200);
  }

  activateEndboss() {
    if (!this.isActive && this.isVisibleOnScreen()) {
      this.isActive = true;
      this.startPatrolAfterDelay();
    }
  }

  startPatrolAfterDelay() {
    setTimeout(() => {
      this.hasStartedPatrol = true;
    }, this.patrolStartDelay);
  }

  checkPanicSound() {
    if (!this.hasPlayedPanicSound && !this.isDead() && this.isVisibleOnScreen()) {
      this.playPanicSound();
    }
  }

  isVisibleOnScreen() {
    if (!this.world) {
      return false;
    }

    let screenLeft = this.x + this.world.camera_x;
    let screenRight = screenLeft + this.width;
    return screenRight > 0 && screenLeft < this.world.canvas.width;
  }

  playPanicSound() {
    this.hasPlayedPanicSound = true;
    this.panic_sound.currentTime = 0;
    this.panic_sound.play().catch((error) => {
      console.log("Panic sound could not be played:", error);
    });
  }

  patrol() {
    if (this.isDead() || this.isHurt() || this.isAttacking()) { // Endboss bewegt sich nicht, wenn er tot, verletzt oder angreift
      return;
    }

    if (this.isMovingForward && this.x > this.startX - this.patrolDistance) {
      this.walkForward();
    } else if (!this.isMovingForward && this.x < this.startX) {
      this.walkBack();
    } else {
      this.x = this.isMovingForward ? this.startX - this.patrolDistance : this.startX;
      this.isMovingForward = !this.isMovingForward;
    }
  }

  walkForward() {
    this.moveLeft();
    this.otherDirection = false;
  }

  walkBack() {
    this.moveRight();
    this.otherDirection = true;
  }

  isAttacking() {
    return this.world && this.getDistanceToCharacter() < this.attackDistance;
  }

  getDistanceToCharacter() {
    return Math.abs(this.getCenterX() - this.getCharacterCenterX());
  }

  getCenterX() {
    return this.x + this.width / 2;
  }

  getCharacterCenterX() {
    return this.world.character.x + this.world.character.width / 2;
  }
}
