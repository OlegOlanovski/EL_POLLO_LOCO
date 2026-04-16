class ThrowableObject extends MovableObject {
    throwDirection = 1;

    constructor(x, y, otherDirection) {
       super().loadimage("img/6_salsa_bottle/salsa_bottle.png");
       this.x = x;
       this.y = y;
       this.throwDirection = otherDirection ? -1 : 1;
       this.width = 80;
       this.height = 80;
       this.trow();
       
        
    }



    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10 * this.throwDirection; // Bewegt das Objekt in Blickrichtung
        }, 25);
    }

}
