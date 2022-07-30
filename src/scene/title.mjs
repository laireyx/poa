/**
 * @typedef {import('pixi.js').Application} Application
 */
import { ScrollingBackgroundLayer } from "../layer/background.mjs";
import Scene from "./scene.mjs";

import nebula from "../../img/Dynamic Space Background FREE/Nebula Blue.png";
import stars from "../../img/Dynamic Space Background FREE/Stars Small_1.png";
import ButtonLayer from "../layer/button.mjs";

class TitleScene extends Scene {
  constructor() {
    super();

    this.nebulaLayer = new ScrollingBackgroundLayer(nebula, {
      scrollSpeed: 4,
    });
    this.starsLayer = new ScrollingBackgroundLayer(stars, {
      scrollSpeed: 8,
    });

    this.buttonLayer = new ButtonLayer("poA");

    this.attachLayer(this.nebulaLayer);
    this.attachLayer(this.starsLayer);
    this.attachLayer(this.buttonLayer);

    this.buttonLayer.x = (this.container.width - this.buttonLayer.width) / 2;
    this.buttonLayer.y = (this.container.height - this.buttonLayer.height) / 2;
  }
}

export default TitleScene;
