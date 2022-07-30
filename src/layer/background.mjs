import { Point, TilingSprite } from "pixi.js";
import { game } from "../game/game.mjs";
import ImageLayer from "./image.mjs";

class BackgroundLayer extends ImageLayer {
  /**
   *
   * @param {import("pixi.js").SpriteSource} bgSource
   */
  constructor(bgSource) {
    super();
    this.setImage(bgSource);

    this.width = game.app.screen.width;
    this.height = game.app.screen.height;
  }
}

/**
 * @typedef ScrollingBackgroundLayerOption
 * @property {number} [scrollSpeed=4]
 */
class ScrollingBackgroundLayer extends ImageLayer {
  /**
   *
   * @param {import("pixi.js").SpriteSource} bgSource
   * @param {ScrollingBackgroundLayerOption} param1
   */
  constructor(bgSource, { scrollSpeed = 4 } = {}) {
    super();

    this.setSprite(
      TilingSprite.from(bgSource, {
        width: game.app.screen.width,
        height: game.app.screen.height,
      })
    );

    this.scrollSpeed = scrollSpeed;

    this.acc = new Point(0, 0);
  }

  ticker(delta) {
    if (game.interactionManager.mouse.global.x < 0) return;

    const { x, y } = game.interactionManager.mouse.getLocalPosition(
      game.app.stage
    );
    const { width, height } = game.app.screen;

    this.acc.x = 2 * (x / width - 0.5);
    this.acc.y = 2 * (y / height - 0.5);

    this.tileX -= this.acc.x * delta * this.scrollSpeed;
    this.tileY -= this.acc.y * delta * this.scrollSpeed;
  }
}

export { BackgroundLayer, ScrollingBackgroundLayer };
