/**
 * @typedef {import('pixi.js').Application} Application
 */
import { InteractionManager, Point, TilingSprite } from "pixi.js";
import ImageLayer from "../layer/image.mjs";
import Scene from "./scene.mjs";

/**
 * @typedef BackgroundOption
 * @property {boolean} [tile]
 */
class BackgroundScene extends Scene {
  /**
   *
   * @param {Application} app
   */
  constructor(app) {
    super(app);

    this.backgroundLayer = new ImageLayer();
    this.attachLayer(this.backgroundLayer);
  }

  /**
   * Set background
   * @param {SpriteSource} bgSource
   * @param {BackgroundOption} opts
   * @return {BackgroundScene}
   */
  setBackground(bgSource, opts = {}) {
    if (opts.tile)
      this.backgroundLayer.setSprite(
        TilingSprite.from(bgSource, {
          width: this.app.screen.width,
          height: this.app.screen.height,
        })
      );
    else this.backgroundLayer.setImage(bgSource);

    return this;
  }
}

/**
 * @typedef ScrollingBackgroundOption
 * @property {number} [scrollSpeed=4]
 */
class ScrollingBackgroundScene extends BackgroundScene {
  /**
   *
   * @param {Application} app
   * @param {ScrollingBackgroundOption} opts
   */
  constructor(app, { scrollSpeed = 4 } = {}) {
    super(app);

    this.scrollSpeed = scrollSpeed;

    this.acc = new Point(scrollSpeed, 0);

    this.interactionManager = new InteractionManager(app.renderer, {
      autoPreventDefault: true,
    });
  }

  /**
   * Set scrolling background
   * @param {SpriteSource} bgSource
   * @return {BackgroundScene}
   */
  setBackground(bgSource) {
    return super.setBackground(bgSource, { tile: true });
  }

  ticker(delta) {
    this.backgroundLayer.tileX -= this.acc.x * delta;
    this.backgroundLayer.tileY -= this.acc.y * delta;

    if (this.interactionManager.mouse.global.x < 0) return;

    const { x, y } = this.interactionManager.mouse.getLocalPosition(
      this.app.stage
    );
    const { width, height } = this.app.screen;

    this.acc.x = 2 * (this.scrollSpeed * (x / width - 0.5));
    this.acc.y = 2 * (this.scrollSpeed * (y / height - 0.5));

    this.lastPosition = this.interactionManager.mouse.global.clone();
  }
}

export { ScrollingBackgroundScene };
export default BackgroundScene;
