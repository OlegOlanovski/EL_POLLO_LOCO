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



    trow() {
        this.speedY = this.throwSpeedY;
        this.applyGravity();
        this.throwIntervalId = setInterval(() => {
            if (this.isGamePaused()) {
                return;
            }

            this.x += this.throwSpeedX * this.throwDirection; // Bewegt das Objekt in Blickrichtung
            if (this.hasHitGround()) {
                this.splashOnGround();
            }
        }, 25);
    }

    isAboveGround() {
        return this.y < this.groundY;
    }

    hasHitGround() {
        return this.y >= this.groundY && this.speedY <= 0;
    }

    splashOnGround() {
        this.y = this.groundY;
        this.splash();
    }

    splash(callback) {
        if (this.isSplashing) {
            return;
        }

        this.isSplashing = true;
        this.speedY = 0;
        clearInterval(this.throwIntervalId);
        this.stopGravity();
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_SPLASH);

        this.splashAnimationIntervalId = setInterval(() => {
            if (this.isGamePaused()) {
                return;
            }

            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                clearInterval(this.splashAnimationIntervalId);
                this.isFinished = true;
                if (callback) {
                    callback();
                }
                return;
            }

            this.playAnimation(this.IMAGES_SPLASH);
        }, this.splashFrameDuration);
    }

}
