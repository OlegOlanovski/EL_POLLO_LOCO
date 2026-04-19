let level1;
/**
 * Initializes the first level with enemies, scenery, collectibles, and bottles.
 */
function initLevel() {


level1 = new Level(
  [
    new Chicken(450),
    new SmallChicken(600),
    new Chicken(700),
    new Chicken(950),
    new SmallChicken(1100),
    new Chicken(1250),
    new Chicken(1550),
    new SmallChicken(1700),
    new Chicken(1850),
    new SmallChicken(2000),
    new Endboss(),
  ],
  [
    new Cloud(-300),
    new Cloud(100),
    new Cloud(500),
    new Cloud(900),
    new Cloud(1300),
    new Cloud(1700),
    new Cloud(2100),
    new Cloud(2500),
  ],
  [
    new BackgroundObject("img/5_background/layers/air.png", -720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/air.png", 720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      720 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      720 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      720 * 2
    ),
    new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      720 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      720 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      720 * 3
    ),
  ],
  [
    new Bottle(420),
    new Bottle(720),
    new Bottle(980),
    new Bottle(1300),
    new Bottle(1700),
    new Bottle(2050),
    new Bottle(2300),
  ],
  [
    new Coin(520),
    new Coin(820),
    new Coin(1120),
    new Coin(1450),
    new Coin(1850),
  ]
);
}
