class Character extends MovableObject {
  width = 160;
  height = 240;
  y = 185;

  constructor() {
    super().loadimage("img/2_character_pepe/2_walk/W-21.png");
  }
  jump() {}
}
