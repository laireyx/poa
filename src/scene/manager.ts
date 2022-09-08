import { Container } from "pixi.js";
import type Scene from "./scene.js";

enum ChangeScene {
  REPLACE_TOP = 1, // Default
  CLEAR_TOP = 2,
}

class SceneManager {
  container: Container;
  scenes: Map<String, Scene> = new Map();
  sceneStack: Scene[] = [];

  constructor() {
    this.container = new Container();
  }

  addScene(scene: Scene): void {
    if (this.scenes.has(scene.name)) {
      throw new Error(`Scene name "${scene.name}" is already in use.`);
    }
    this.scenes.set(scene.name, scene);
  }

  change(sceneName: string, mode = ChangeScene.REPLACE_TOP) {
    const newScene = this.scenes.get(sceneName);
    if (!newScene)
      throw new Error(
        `Scene with name "${sceneName}" is not found in the game instance`
      );

    switch (mode) {
      case ChangeScene.REPLACE_TOP:
        this.pop();
        break;
      case ChangeScene.CLEAR_TOP:
        this.pop();
        this.sceneStack = [];
        break;
    }

    this.push(sceneName);
  }

  push(sceneName: string) {
    const newScene = this.scenes.get(sceneName);
    if (!newScene)
      throw new Error(
        `Scene with name "${sceneName}" is not found in the game instance`
      );

    newScene.onStart();
    this.sceneStack.push(newScene);

    this.container.removeChildren();
    this.container.addChild(newScene.container);
  }

  pop() {
    const topScene = this.sceneStack.pop();
    topScene?.onEnd();
  }
}

export default SceneManager;
