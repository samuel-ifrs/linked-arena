import { GameRegistry } from "../../core/GameRegistry";
import { QueensGameScreen } from "./QueensGameScreen";

GameRegistry.register({
  id: "queens",
  title: "Queens",
  icon: "♛",
  GameScreen: QueensGameScreen,
});