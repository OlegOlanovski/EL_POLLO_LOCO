class Coin extends MovableObject {
  width = 130;
  height = 130;
  y = 50;
  offset = {
    top: 45,
    bottom: 45,
    left: 45,
    right: 45,
  };

  /**
   * Creates a new instance and initializes its default state.
   * @param {number} x - Horizontal start position.
   */
  constructor(x) {
    super().loadimage("img/8_coin/coin_1.png");
    this.x = x;
  }
}
