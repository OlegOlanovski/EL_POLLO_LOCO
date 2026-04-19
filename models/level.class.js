class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 2200;

  /**
   * Creates a new instance and initializes its default state.
   * @param {MovableObject[]} enemies - Level enemies.
   * @param {Cloud[]} clouds - Level clouds.
   * @param {BackgroundObject[]} backgroundObjects - Level background objects.
   * @param {Bottle[]} bottles - Collectable bottles.
   * @param {Coin[]} coins - Collectable coins.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
