/**
 * @typedef {import('pixi.js').Application} Application
 */
import { ScrollingBackgroundLayer } from "../layer/background.mjs";
import Scene from "./scene.mjs";

import nebula from "../../img/title/nebula/blue.png";
import smallStars from "../../img/title/stars/small1.png";
import smallStars2 from "../../img/title/stars/small2.png";
import bigStars from "../../img/title/stars/big1.png";
import bigStars2 from "../../img/title/stars/big2.png";
import MenuLayer from "../layer/menu.mjs";

class TitleScene extends Scene {
  constructor() {
    super();

    this.spaceLayers = [
      new ScrollingBackgroundLayer(nebula, {
        scrollSpeed: 4,
      }),
      new ScrollingBackgroundLayer(smallStars, {
        scrollSpeed: 6,
      }),
      new ScrollingBackgroundLayer(smallStars2, {
        scrollSpeed: 8,
      }),
      // new ScrollingBackgroundLayer(bigStars, {
      //   scrollSpeed: 10,
      // }),
      new ScrollingBackgroundLayer(bigStars2, {
        scrollSpeed: 12,
      }),
    ];

    this.menuLayer = new MenuLayer()
      .addButton("poA")
      .addButton("Continue")
      .addButton("Exit")
      .build();

    this.spaceLayers.forEach((layer) => this.attachLayer(layer));
    this.attachLayer(this.menuLayer);

    this.menuLayer.x = (this.container.width - this.menuLayer.width) / 2;
    this.menuLayer.y = (this.container.height - this.menuLayer.height) / 2;
  }
}

export default TitleScene;
