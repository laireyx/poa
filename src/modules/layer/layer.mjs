import { Container } from "pixi.js";

class Layer {
  constructor() {
    this.container = new Container();
  }

  ticker(delta) {}

  onAttach() {}
  onDetach() {}
}

export default Layer;
