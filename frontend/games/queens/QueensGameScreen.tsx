import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connectSocket } from '../../socket';

const CELL_SIZE = 36;

export function QueensGameScreen() {
  const [board, setBoard] = useState<any[][]>([]);
  const [size, setSize] = useState(8);

  useEffect(() => {
    const socket = connectSocket();

    socket.on('receive_queens_game', (data) => {
      setBoard(data.board);
      setSize(data.size);
    });

    socket.emit('request_new_queens_game');

    return () => {
      socket.off('receive_queens_game');
    };
  }, []);

  function renderCell(cell: any) {
    let content = "";
    if (cell.state === "queen") content = "♛";
    else if (cell.state === "blocked") content = "X";
    return (
      <TouchableOpacity
        key={cell.col}
        style={[
          styles.cell,
          { backgroundColor: cell.color, borderColor: "#333", borderWidth: 1 }
        ]}
        disabled
      >
        <Text style={[
          styles.cellText,
          cell.state === "queen" && { color: "#c500ff", fontWeight: "bold", fontSize: 28 },
          cell.state === "blocked" && { color: "#888" }
        ]}>{content}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queens</Text>
      <View style={styles.board}>
        {board.map((row, rowIdx) => (
          <View style={styles.row} key={rowIdx}>
            {row.map((cell: any) => renderCell(cell))}
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          const socket = connectSocket();
          socket.emit('request_new_queens_game');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Novo Tabuleiro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 10, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", margin: 20 },
  board: { marginVertical: 12 },
  row: { flexDirection: "row" },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    borderRadius: 8
  },
  cellText: { fontSize: 16, color: "#333" },
  button: {
    marginTop: 10, backgroundColor: "#7a81ff", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});