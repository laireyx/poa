import type { ScrollingBackgroundLayerOption } from "../layer/background.js";

import {
  BackgroundLayer,
  ScrollingBackgroundLayer,
} from "../layer/background.js";
import Scene from "../scene/scene.js";
import Loader from "./loader.js";

enum BackgroundType {
  Still = "still",
  Scroll = "scroll",
}

type BackgroundJson = {
  type: BackgroundType;
  src: string;
  scrollOpts: ScrollingBackgroundLayerOption;
};

type SceneJson = {
  name: string;
  background: BackgroundJson[];
};

class SceneLoader extends Loader<Scene> {
  constructor(path: string) {
    super(path);
  }

  onLoad(sceneJson: SceneJson): Scene {
    const scene = new Scene(sceneJson.name);

    sceneJson.background.forEach((bgJson) => {
      switch (bgJson.type) {
        case BackgroundType.Still:
          scene.attachLayer(new BackgroundLayer(bgJson.src));
          break;
        case BackgroundType.Scroll:
          scene.attachLayer(
            new ScrollingBackgroundLayer(bgJson.src, bgJson.scrollOpts)
          );
          break;
      }
    });

    return scene;
  }
}

export default SceneLoader;
