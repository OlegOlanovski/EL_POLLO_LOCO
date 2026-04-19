class ThrowableObject extends MovableObject {
    throwDirection = 1;
    isSplashing = false;
    throwIntervalId;
    splashAnimationIntervalId;
    splashFrameDuration = 80;
    groundY = 350;
    throwSpeedY = 20;
    throwSpeedX = 8;
    isFinished = false;

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    /**
     * Creates a new instance and initializes its default state.
     * @param {number} x - Horizontal start position.
     * @param {number} y - Vertical start position.
     * @param {boolean} otherDirection - Whether the character faces left.
     */
    constructor(x, y, otherDirection) {
       super().loadimage("img/6_salsa_bottle/salsa_bottle.png");
       this.loadImages(this.IMAGES_SPLASH);
       this.x = x;
       this.y = y;
       this.throwDirection = otherDirection ? -1 : 1;
       this.width = 80;
       this.height = 80;
       this.trow();

    }

    /**
     * Throws the bottle in the current direction.
     */
    trow() {
        this.speedY = this.throwSpeedY;
        this.applyGravity();
        this.throwIntervalId = setInterval(() => {
            if (this.isGamePaused()) {
                return;
            }

            this.x += this.throwSpeedX * this.throwDirection; // Moves the object in the facing direction.
            if (this.hasHitGround()) {
                this.splashOnGround();
            }
        }, 25);
    }

    /**
     * Is above ground.
     * @returns {boolean} Result of the check.
     */
    isAboveGround() {
        return this.y < this.groundY;
    }

    /**
     * Checks whether the bottle has hit the ground.
     * @returns {boolean} Result of the check.
     */
    hasHitGround() {
        return this.y >= this.groundY && this.speedY <= 0;
    }

    /**
     * Starts a splash animation at ground level.
     */
    splashOnGround() {
        this.y = this.groundY;
        this.splash();
    }

    /**
     * Starts the bottle splash animation.
     * @param {Function} callback - Optional function called after the animation finishes.
     */
    splash(callback) {
        if (this.isSplashing) {
            return;
        }

        this.prepareSplash();
        this.startSplashAnimation(callback);
    }

    /**
     * Prepares the bottle state for splash animation.
     */
    prepareSplash() {
        this.isSplashing = true;
        this.speedY = 0;
        clearInterval(this.throwIntervalId);
        this.stopGravity();
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_SPLASH);
    }

    /**
     * Runs the bottle splash animation.
     * @param {Function} callback - Optional function called after the animation finishes.
     */
    startSplashAnimation(callback) {
        this.splashAnimationIntervalId = setInterval(() => {
            if (this.isGamePaused()) {
                return;
            }

            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                this.finishSplashAnimation(callback);
                return;
            }

            this.playAnimation(this.IMAGES_SPLASH);
        }, this.splashFrameDuration);
    }

    /**
     * Finishes the bottle splash animation.
     * @param {Function} callback - Optional function called after the animation finishes.
     */
    finishSplashAnimation(callback) {
        clearInterval(this.splashAnimationIntervalId);
        this.isFinished = true;
        if (callback) {
            callback();
        }
    }

}
