class MovableObject {
  x = 120;
  y = 250;
  img;
  hight = 150;
  width = 100;

  loadimage(path) {
    this.img = new Image(); // this.img = document.getElementById("image") <img id="image" src>;
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveleft() {}
}
