import type { ButtonCallback } from "./button.js";

import { Graphics } from "pixi.js";
import ButtonLayer from "./button.js";
import Layer from "./layer.js";

type MenuPadding = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
};

class MenuLayer extends Layer {
  padding: MenuPadding;
  buttons: ButtonLayer[] = [];
  background: Graphics;

  constructor(padding?: MenuPadding) {
    super();

    this.padding = Object.assign(
      {
        left: 12,
        right: 24,
        top: 8,
        bottom: 8,
      } as MenuPadding,
      padding
    );

    this.background = new Graphics().beginFill(0x000000, 0.5);
    this.container.addChild(this.background);
  }

  addButton(text: string, cb?: ButtonCallback): MenuLayer {
    const lastButton = this.buttons[this.buttons.length - 1];
    const newButton = new ButtonLayer(text, cb);

    newButton.x = lastButton?.x ?? this.padding.left;
    newButton.y =
      (lastButton?.y ?? this.padding.top) + (lastButton?.height ?? 0);

    this.buttons.push(newButton);
    this.container.addChild(newButton.container);

    return this;
  }

  build(): MenuLayer {
    this.background.drawRoundedRect(
      0,
      0,
      this.width + (this.padding.right ?? 0),
      this.height + (this.padding.bottom ?? 0),
      8
    );

    return this;
  }

  ticker(delta: number) {
    this.buttons.forEach((button) => button.ticker(delta));
  }
}

export default MenuLayer;
