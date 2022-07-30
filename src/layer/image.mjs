import { Sprite, Texture, TilingSprite } from "pixi.js";
import Layer from "./layer.mjs";

class ImageLayer extends Layer {
  constructor() {
    super();

    this.imageSprite = new Sprite(this.imageSource);
    this.container.addChild(this.imageSprite);
  }

  /**
   * Set Image
   * @param {SpriteSource} imageSource
   */
  setImage(imageSource) {
    const imageSprite = Sprite.from(imageSource);

    this.setSprite(imageSprite);
  }

  /**
   * Set image sprite
   * @param {Sprite} imageSprite
   */
  setSprite(imageSprite) {
    this.container.removeChild(this.imageSprite);

    this.imageSprite = imageSprite;
    this.container.addChild(this.imageSprite);
  }

  get width() {
    return this.imageSprite.width;
  }
  get height() {
    return this.imageSprite.height;
  }

  /**
   * @type {number}
   */
  get x() {
    return this.imageSprite.x;
  }
  /**
   * @type {number}
   */
  get y() {
    return this.imageSprite.y;
  }

  set x(newX) {
    this.imageSprite.x = newX;
  }
  set y(newY) {
    this.imageSprite.y = newY;
  }

  /**
   * @type {number}
   */
  get tileX() {
    return this.imageSprite.tilePosition.x;
  }
  /**
   * @type {number}
   */
  get tileY() {
    return this.imageSprite.tilePosition.y;
  }

  set tileX(newX) {
    this.imageSprite.tilePosition.x = newX;
  }
  set tileY(newY) {
    this.imageSprite.tilePosition.y = newY;
  }
}

export default ImageLayer;
