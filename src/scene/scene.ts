import { Container, Ticker } from "pixi.js";
import type Layer from "../layer/layer.js";

class Scene {
  name: string;
  container: Container;
  layers: Layer[] = [];

  constructor(name: string) {
    this.name = name;
    this.container = new Container();
    this.ticker = this.ticker.bind(this);
  }

  ticker(delta: number) {
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

  attachLayer(newLayer: Layer) {
    this.container.addChild(newLayer.container);
    newLayer.onAttach();
    this.layers.push(newLayer);
  }

  detachLayer(existingLayer: Layer) {
    const existingIdx = this.layers.indexOf(existingLayer);
    if (existingIdx > 0) {
      const [detachedLayer] = this.layers.splice(existingIdx, 1);
      detachedLayer.onDetach();
      this.container.removeChild(detachedLayer.container);
    }
  }
}

export default Scene;
