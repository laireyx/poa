import { Graphics, Text } from "pixi.js";
import Layer from "./layer.mjs";

class ButtonLayer extends Layer {
  hovering = false;
  hoverTime = 0;
  /**
   *
   * @param {string} text
   * @param {function} cb
   */
  constructor(text, cb = null) {
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

    if (cb) this.text.on("click", cb);
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
}

export default ButtonLayer;
