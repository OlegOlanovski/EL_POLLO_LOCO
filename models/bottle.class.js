class Bottle extends MovableObject {
  width = 70;
  height = 70;
  y = 350;

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = x;
  }
}
