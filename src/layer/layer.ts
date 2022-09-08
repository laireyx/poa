import { Container } from "pixi.js";

abstract class Layer {
  container: Container;

  constructor() {
    this.container = new Container();
  }

  abstract ticker(delta: number): void;

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
