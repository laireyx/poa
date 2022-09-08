import { SpriteSource, Texture } from "pixi.js";
import { TilingSprite } from "pixi.js";
import { game } from "../../game/game.js";
import Layer from "../layer.js";

class TilingImageLayer extends Layer {
  imageSprite: TilingSprite;

  constructor() {
    super();

    this.imageSprite = new TilingSprite(Texture.EMPTY);
    this.container.addChild(this.imageSprite);
  }

  setImage(imageSource: SpriteSource) {
    const imageSprite = TilingSprite.from(imageSource, {
      width: game.app.screen.width,
      height: game.app.screen.height,
    });

    this.setSprite(imageSprite);
  }

  setSprite(imageSprite: TilingSprite) {
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

  get tileX(): number {
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

  ticker(delta: number): void {
    delta;
  }
}

export default TilingImageLayer;
