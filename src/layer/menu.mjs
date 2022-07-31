import { Graphics } from "pixi.js";
import ButtonLayer from "./button.mjs";
import Layer from "./layer.mjs";

class MenuLayer extends Layer {
  /** @type {ButtonLayer[]} */
  buttons = [];

  /**
   *
   * @param {object} padding
   * @param {number} padding.left
   * @param {number} padding.right
   * @param {number} padding.top
   * @param {number} padding.bottom
   */
  constructor({ left = 12, right = 24, top = 8, bottom = 8 } = {}) {
    super();

    this.padding = { left, right, top, bottom };

    this.background = new Graphics().beginFill(0x000000, 0.5);
    this.container.addChild(this.background);
  }

  /**
   *
   * @param {string} text
   * @param {function} cb
   * @return {MenuLayer}
   */
  addButton(text, cb) {
    const lastButton = this.buttons[this.buttons.length - 1];
    const newButton = new ButtonLayer(text, cb);

    newButton.x = lastButton?.x ?? this.padding.left;
    newButton.y =
      (lastButton?.y ?? this.padding.top) + (lastButton?.height ?? 0);

    this.buttons.push(newButton);
    this.container.addChild(newButton.container);

    return this;
  }

  /**
   * @return {MenuLayer}
   */
  build() {
    this.background.drawRoundedRect(
      0,
      0,
      this.width + this.padding.right,
      this.height + this.padding.bottom,
      8
    );
    return this;
  }

  ticker(delta) {
    this.buttons.forEach((button) => button.ticker(delta));
  }
}

export default MenuLayer;
