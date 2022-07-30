import { Application, InteractionManager } from "pixi.js";
import TitleScene from "../scene/title.mjs";
import SceneManager from "../scene/manager.mjs";

class Game {
  constructor() {
    this.initPixi();
    this.initScene();
  }

  initPixi() {
    const cv = document.querySelector("#game-cv");
    this.app = new Application({ width: 1280, height: 720, view: cv });

    this.interactionManager = new InteractionManager(this.app.renderer, {
      autoPreventDefault: true,
    });

    document.body.appendChild(this.app.view);
  }

  initScene() {
    this.sceneManager = new SceneManager();
    this.app.stage.addChild(this.sceneManager.container);
  }

  start() {
    this.sceneManager.push(new TitleScene());
  }
}

export const game = new Game();
