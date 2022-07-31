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

  get x() {
    return this.container.x;
  }
  get y() {
    return this.container.y;
  }

  set x(newX) {
    this.container.x = newX;
  }
  set y(newY) {
    this.container.y = newY;
  }

  get width() {
    return this.container.width;
  }
  get height() {
    return this.container.height;
  }
}

export default Layer;
