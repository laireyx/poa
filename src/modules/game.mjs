import { Application } from "pixi.js";
import { ScrollingBackgroundScene } from "./scene/background.mjs";
import SceneManager from "./scene/manager.mjs";

import nebula from "../../img/Dynamic Space Background FREE/Nebula Blue.png";
import stars from "../../img/Dynamic Space Background FREE/Stars Small_1.png";

class Game {
  constructor() {
    this.initPixi();
    this.initScene();
  }

  initPixi() {
    const cv = document.querySelector("#game-cv");
    this.app = new Application({ width: 1280, height: 720, view: cv });

    document.body.appendChild(this.app.view);
  }

  initScene() {
    this.sceneManager = new SceneManager(this.app);
    this.app.stage.addChild(this.sceneManager.container);
  }

  start() {
    this.sceneManager.push(
      new ScrollingBackgroundScene(this.app, { scrollSpeed: 4 }).setBackground(
        nebula
      )
    );
    this.sceneManager.push(
      new ScrollingBackgroundScene(this.app, {
        scrollSpeed: 20,
      }).setBackground(stars)
    );
  }
}

export const game = new Game();
