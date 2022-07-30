import { Container } from "pixi.js";

class Layer {
  constructor() {
    this.container = new Container();
  }

  /**
   *
   * @param {number} delta
   */
  ticker(delta) {}

  onAttach() {}
  onDetach() {}
}

export default Layer;
