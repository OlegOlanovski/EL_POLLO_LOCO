class Coin extends MovableObject {
  width = 130;
  height = 130;
  y = 50;

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/8_coin/coin_1.png");
    this.x = x;
  }
}
