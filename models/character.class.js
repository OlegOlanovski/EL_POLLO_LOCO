class Character extends MovableObject {
  constructor() {
    super().loadimage("img/2_character_pepe/2_walk/W-21.png"); // sdes kartinka nado zagruzit esche
  }
  jump() {
    console.log("Jumping");
  }
}
