import type { Game } from "./game/game.js";
import { game } from "./game/game.js";

declare global {
  interface Window {
    game: Game;
  }
}

window.addEventListener("load", () => {
  window.game = game;
  console.log("Game Start");
  game.start();
});
