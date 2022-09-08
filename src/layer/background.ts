import type { SpriteSource } from "pixi.js";
import { Point } from "pixi.js";
import { game } from "../game/game.js";
import ImageLayer from "./image/image.js";
import TilingImageLayer from "./image/tiling.js";

class BackgroundLayer extends ImageLayer {
  constructor(bgSource: SpriteSource) {
    super();
    this.setImage(bgSource);
  }

  get width(): number {
    return game.app.screen.width;
  }
  get height(): number {
    return game.app.screen.height;
  }
}

type ScrollingBackgroundLayerOption = {
  scrollSpeed?: number;
  infinite?: boolean;
};

export type { ScrollingBackgroundLayerOption };

class ScrollingBackgroundLayer extends TilingImageLayer {
  scrollSpeed = 4;
  infinite = true;
  acc: Point;

  constructor(
    bgSource: SpriteSource,
    scrollOpts: ScrollingBackgroundLayerOption | null
  ) {
    super();

    this.scrollSpeed = scrollOpts?.scrollSpeed ?? this.scrollSpeed;
    this.infinite = scrollOpts?.infinite ?? this.infinite;

    this.setImage(bgSource);

    this.acc = new Point(0, 0);
  }

  ticker(delta: number) {
    if (game.interactionManager.mouse.global.x < 0) return;

    const { x, y } = game.interactionManager.mouse.getLocalPosition(
      game.app.stage
    );
    const { width, height } = game.app.screen;

    this.acc.x = 2 * (x / width - 0.5);
    this.acc.y = 2 * (y / height - 0.5);

    this.tileX -= this.acc.x * delta * this.scrollSpeed;
    this.tileY -= this.acc.y * delta * this.scrollSpeed;
    if (!this.infinite) {
      if (this.tileX > 0) this.tileX = 0;
      if (this.tileY > 0) this.tileY = 0;

      if (this.tileX < game.app.screen.width - this.imageSprite.texture.width)
        this.tileX = game.app.screen.width - this.imageSprite.texture.width;
      if (this.tileY < game.app.screen.height - this.imageSprite.texture.height)
        this.tileY = game.app.screen.height - this.imageSprite.texture.height;
    }
  }
}

export { BackgroundLayer, ScrollingBackgroundLayer };
