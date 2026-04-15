class Bottle extends MovableObject {
  width = 70;
  height = 70;
  y = 350;

  constructor(x) {
    super().loadimage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = x;
  }
}
