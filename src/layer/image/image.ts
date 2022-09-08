import type { SpriteSource } from "pixi.js";
import { Sprite } from "pixi.js";
import Layer from "../layer.js";

class ImageLayer extends Layer {
  imageSprite: Sprite;

  constructor() {
    super();

    this.imageSprite = new Sprite();
    this.container.addChild(this.imageSprite);
  }

  setImage(imageSource: SpriteSource) {
    const imageSprite = Sprite.from(imageSource);

    this.setSprite(imageSprite);
  }

  setSprite(imageSprite: Sprite) {
    this.container.removeChild(this.imageSprite);

    this.imageSprite = imageSprite;
    this.container.addChild(this.imageSprite);
  }

  get width(): number {
    return this.imageSprite.width;
  }
  get height(): number {
    return this.imageSprite.height;
  }

  get x(): number {
    return this.imageSprite.x;
  }
  get y(): number {
    return this.imageSprite.y;
  }

  set x(newX: number) {
    this.imageSprite.x = newX;
  }
  set y(newY: number) {
    this.imageSprite.y = newY;
  }

  ticker(): void {}
}

export default ImageLayer;
