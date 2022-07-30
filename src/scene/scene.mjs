/**
 * @typedef {import('pixi.js').Application} Application
 * @typedef {import("../layer/layer.mjs").default} Layer
 */

import { Container, Ticker } from "pixi.js";

class Scene {
  /** @type {Layer[]} */
  layers = [];
  constructor() {
    this.container = new Container();
    this.ticker = this.ticker.bind(this);
  }

  /**
   * Scene ticker
   * @param {number} delta
   */
  ticker(delta) {
    // Pass ticker event to all layers
    this.layers?.forEach((layer) => {
      layer.ticker(delta);
    });
  }

  /**
   * Called when this scene is started(or resumed)
   */
  onStart() {
    Ticker.shared.add(this.ticker);
  }
  /**
   * Called when this scene is finished(or paused)
   */
  onEnd() {
    Ticker.shared.remove(this.ticker);
  }

  /**
   * Attach a new layer
   * @param {Layer} newLayer
   */
  attachLayer(newLayer) {
    this.container.addChild(newLayer.container);
    newLayer.onAttach();
    this.layers.push(newLayer);
  }

  /**
   * Detach an existing layer
   * @param {Layer} existingLayer
   */
  detachLayer(existingLayer) {
    const existingIdx = this.layers.indexOf(existingLayer);
    if (existingIdx > 0) {
      const [detachedLayer] = this.layers.splice(existingIdx, 1);
      detachedLayer.onDetach();
      this.container.removeChild(detachedLayer.container);
    }
  }
}

export default Scene;
