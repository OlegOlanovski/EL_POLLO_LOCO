class Coin extends MovableObject {
  width = 130;
  height = 130;
  y = 50;

  constructor(x) {
    super().loadimage("img/8_coin/coin_1.png");
    this.x = x;
  }
}
