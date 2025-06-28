import React from "react";

export interface GameRegistration {
  id: string;
  title: string;
  icon: string;
  GameScreen: React.ComponentType<any>;
}

class GameRegistryClass {
  private games: GameRegistration[] = [];

  register(game: GameRegistration) {
    if (!this.games.find(g => g.id === game.id)) {
      this.games.push(game);
    }
  }

  getGames(): GameRegistration[] {
    return this.games;
  }
}

export const GameRegistry = new GameRegistryClass();