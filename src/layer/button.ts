import { Text } from "pixi.js";
import Layer from "./layer.js";

type ButtonCallback = () => void;

export type { ButtonCallback };

class ButtonLayer extends Layer {
  pixiText: Text;

  hovering = false;
  hoverTime = 0;

  constructor(text: string, cb?: ButtonCallback) {
    super();

    this.pixiText = new Text(text, {
      // fontFamily: "",
      fontSize: 36,
      fill: 0x888888,
      dropShadow: true,
    });

    this.pixiText.interactive = true;
    this.pixiText.buttonMode = true;

    this.pixiText.on("pointerover", () => {
      this.hovering = true;
    });
    this.pixiText.on("pointerout", () => {
      this.hovering = false;
    });

    if (cb !== undefined) this.pixiText.on("click", cb);
    this.container.addChild(this.pixiText);
  }

  ticker(delta: number) {
    if (this.hovering) this.hoverTime += delta / 30;
    else this.hoverTime -= delta / 15;

    if (this.hoverTime < 0) this.hoverTime = 0;
    if (this.hoverTime > 1) this.hoverTime = 1;

    this.pixiText.style.fill = ~~(~~(0x88 + 0x77 * this.hoverTime) * 0x010101);
  }
}

export default ButtonLayer;
