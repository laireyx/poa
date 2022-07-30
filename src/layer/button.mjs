import { Text } from "pixi.js";
import Layer from "./layer.mjs";

class ButtonLayer extends Layer {
  hovering = false;
  hoverTime = 0;
  /**
   *
   * @param {string} text
   */
  constructor(text) {
    super();

    this.text = new Text(text, {
      // fontFamily: "",
      fontSize: 36,
      fill: 0x888888,
      dropShadow: true,
    });

    this.text.interactive = true;
    this.text.buttonMode = true;

    this.text.on("pointerover", () => {
      this.hovering = true;
    });
    this.text.on("pointerout", () => {
      this.hovering = false;
    });

    this.container.addChild(this.text);
  }

  /**
   *
   * @param {number} delta
   */
  ticker(delta) {
    if (this.hovering) this.hoverTime += delta / 30;
    else this.hoverTime -= delta / 15;

    if (this.hoverTime < 0) this.hoverTime = 0;
    if (this.hoverTime > 1) this.hoverTime = 1;

    this.text.style.fill = ~~(~~(0x88 + 0x77 * this.hoverTime) * 0x010101);
  }

  get width() {
    return this.text.width;
  }
  get height() {
    return this.text.height;
  }

  /**
   * @type {number}
   */
  get x() {
    return this.text.x;
  }
  /**
   * @type {number}
   */
  get y() {
    return this.text.y;
  }

  set x(newX) {
    this.text.x = newX;
  }
  set y(newY) {
    this.text.y = newY;
  }
}

export default ButtonLayer;
