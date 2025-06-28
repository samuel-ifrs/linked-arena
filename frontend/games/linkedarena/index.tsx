import { GameRegistry } from "../../core/GameRegistry";
import { LinkedArenaLogo } from "../../assets/icons/LinkedArenaLogo";
import { View, Text } from "react-native";

// Exemplo de GameScreen placeholder
function LinkedArenaScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinkedArenaLogo size={96} />
      <Text style={{ fontSize: 32, marginTop: 16 }}>Bem-vindo ao Linked Arena!</Text>
    </View>
  );
}

GameRegistry.register({
  id: "linkedarena",
  title: "Linked Arena",
  icon: <LinkedArenaLogo size={32} />,
  GameScreen: LinkedArenaScreen,
});