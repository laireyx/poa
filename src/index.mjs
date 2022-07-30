import { game } from "./game/game.mjs";

window.addEventListener("load", () => {
  window.game = game;
  console.log("Game Start");
  game.start();
});
