import type Scene from "../scene/scene.js";

import { Application, InteractionManager } from "pixi.js";
import TitleScene from "../scene/title.js";
import SceneManager from "../scene/manager.js";
import LabScene from "../scene/lab.js";

class Game {
  app!: Application;
  interactionManager!: InteractionManager;
  sceneManager!: SceneManager;
  scenes: Map<String, Scene> = new Map();

  constructor() {
    this.initPixi();
    this.initScene();
  }

  initPixi() {
    const cv = document.querySelector<HTMLCanvasElement>("#game-cv");
    if (!cv) throw new Error("Cannot find game canvas");

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
    this.scenes.set("title", new TitleScene());
    this.scenes.set("lab", new LabScene());

    const titleScene = this.scenes.get("title");
    if (!titleScene) throw new Error("Cannot find title scene");

    this.sceneManager.change("title");
  }
}

export type { Game };
export const game = new Game();
