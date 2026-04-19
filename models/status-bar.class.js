class Statusbar extends MovableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.width = 160;
    this.height = 48;
    this.x = 20;
    this.y = 0;
    this.setPercentage(100); // Starts with a full status bar.
  }

  // Sets the status bar according to the current percentage.
  /**
   * Updates the displayed status bar percentage.
   * @param {number} percentage - Current percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ...5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path]; // Updates the image according to the new percentage.
  }
  
  /**
   * Resolve image index.
   * @returns {number} Calculated numeric value.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}

class StatusbarCoin extends MovableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 0;

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.width = 160;
    this.height = 48;
    this.x = 20;
    this.y = 38;
    this.setPercentage(0);
  }

  /**
   * Updates the displayed status bar percentage.
   * @param {number} percentage - Current percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolve image index.
   * @returns {number} Calculated numeric value.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}

class StatusbarBottle extends MovableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  percentage = 0;

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.width = 160;
    this.height = 48;
    this.x = 20;
    this.y = 76;
    this.setPercentage(0);
  }

  /**
   * Updates the displayed status bar percentage.
   * @param {number} percentage - Current percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolve image index.
   * @returns {number} Calculated numeric value.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}

class StatusbarEndboss extends MovableObject {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  percentage = 100;

  /**
   * Creates a new instance and initializes its default state.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.width = 160;
    this.height = 48;
    this.x = 540;
    this.y = 0;
    this.setPercentage(100);
  }

  /**
   * Updates the displayed status bar percentage.
   * @param {number} percentage - Current percentage value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolve image index.
   * @returns {number} Calculated numeric value.
   */
  resolveImageIndex() {
    if (this.percentage == 100) return 5;
    if (this.percentage >= 80) return 4;
    if (this.percentage >= 60) return 3;
    if (this.percentage >= 40) return 2;
    if (this.percentage >= 20) return 1;
    return 0;
  }
}
