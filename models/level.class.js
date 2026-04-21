class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 2400;

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

  /**
   * Returns the world-space end position of the background.
   * @returns {number} Rightmost background edge.
   */
  getBackgroundEndX() {
    if (!this.backgroundObjects.length) {
      return this.level_end_x;
    }

    return this.backgroundObjects.reduce((maxX, backgroundObject) => {
      return Math.max(maxX, backgroundObject.x + backgroundObject.width);
    }, this.level_end_x);
  }
}
