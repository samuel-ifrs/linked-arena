import { GameRegistry } from "../../core/GameRegistry";
import { SeuGameScreen } from "./SeuGameScreen";

GameRegistry.register({
  id: "seujogo",
  title: "Seu Jogo",
  icon: "🎲",
  GameScreen: SeuGameScreen,
});