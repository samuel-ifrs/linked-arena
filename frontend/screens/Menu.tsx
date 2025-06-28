import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { GameRegistry } from "../core/GameRegistry";

export default function Menu({ navigation }) {
  const games = GameRegistry.getGames();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Linked Arena Games</Text>
      {games.map(game => (
        <TouchableOpacity
          key={game.id}
          style={styles.button}
          onPress={() => navigation.navigate(game.title)}
        >
          <Text style={styles.icon}>{game.icon}</Text>
          <Text style={styles.buttonText}>{game.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 24, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7a81ff",
    padding: 18,
    marginVertical: 8,
    borderRadius: 10,
    width: 250,
    justifyContent: "flex-start",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 20, marginLeft: 14 },
  icon: { fontSize: 32 },
});