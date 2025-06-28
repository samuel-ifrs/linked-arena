import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./screens/Menu";
import { GameRegistry } from "./core/GameRegistry";

// Importa jogos para auto-registro
import "./games/queens";

const Stack = createStackNavigator();

export default function App() {
  const games = GameRegistry.getGames();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        {games.map(game => (
          <Stack.Screen
            key={game.id}
            name={game.title}
            component={game.GameScreen}
            options={{ title: game.title }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}