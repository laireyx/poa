import type Scene from "../scene/scene.js";

import { Application, InteractionManager } from "pixi.js";
import SceneManager from "../scene/manager.js";
import SceneLoader from "../loader/scene.js";

class Game {
  app!: Application;
  interactionManager!: InteractionManager;
  sceneManager!: SceneManager;
  loadTask: Promise<boolean>;

  constructor() {
    this.loadTask = Promise.all([this.initPixi(), this.initScene()])
      .then(() => true)
      .catch(() => false);

    this.loadTask.then(() => this.start());
  }

  async initPixi() {
    const cv = document.querySelector<HTMLCanvasElement>("#game-cv");
    if (!cv) throw new Error("Cannot find game canvas");

    this.app = new Application({ width: 1280, height: 720, view: cv });

    this.interactionManager = new InteractionManager(this.app.renderer, {
      autoPreventDefault: true,
    });

    document.body.appendChild(this.app.view);
  }

  async initScene() {
    this.sceneManager = new SceneManager();

    const sceneLoader = new SceneLoader("/json/scenes");
    const allScenes = await sceneLoader.load();

    console.log(allScenes);
    allScenes.forEach((scene: Scene) => {
      this.sceneManager.addScene(scene);
    });

    this.app.stage.addChild(this.sceneManager.container);
  }

  start() {
    this.sceneManager.change("title");
  }
}

export type { Game };
export const game = new Game();
