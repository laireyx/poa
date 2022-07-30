import { Container } from "pixi.js";
import Scene from "./scene.mjs";

class SceneManager {
  /** @type {Scene[]} */
  sceneStack = [];

  /**
   * Scene manager constructor
   */
  constructor() {
    this.container = new Container();
  }

  /**
   * Change topmost scene.
   *
   * @param {Scene} newScene
   * @param {SceneManager.ChagneScene} mode
   */
  change(newScene, mode = SceneManager.ChagneScene.REPLACE_TOP) {
    switch (mode) {
      case SceneManager.ChagneScene.REPLACE_TOP:
        this.pop();
        break;
      case SceneManager.ChagneScene.CLEAR_TOP:
        this.pop();
        this.sceneStack = [];
        break;
    }

    this.push(newScene);
  }

  /**
   *
   * @param {Scene} newScene
   */
  push(newScene) {
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

/**
 * @enum
 * @property
 */
SceneManager.ChagneScene = Object.freeze({
  REPLACE_TOP: 1, // Default
  CLEAR_TOP: 2,
});

export default SceneManager;
