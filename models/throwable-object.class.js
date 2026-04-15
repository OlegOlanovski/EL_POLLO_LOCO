class ThrowableObject extends MovableObject {
    constructor(x, y) {
       super().loadimage("img/6_salsa_bottle/salsa_bottle.png");
       this.x = x;
       this.y = y;
       this.width = 80;
       this.height = 80;
       this.trow();
       
        
    }



    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10; // Bewegt das Objekt nach rechts
        }, 25);
    }

}