class Bottle extends MovableObject {
  width = 70;
  height = 70;
  y = 350;
  offset = {
    top: 15,
    bottom: 10,
    left: 20,
    right: 20,
  };

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = x;
  }
}
