import { Board, BoardCell, CellState, Color, QueensGameState } from "./types";

// Generates a random color palette (8 colors)
export function randomColors(): Color[] {
  const palette = [
    "#7a81ff", "#ffe188", "#ffb0b0",
    "#baffc9", "#b8f3ff", "#ffb6e1",
    "#bdb2ff", "#ffd6a5"
  ];
  // Shuffle
  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }
  return palette;
}

// Generates a random region mapping for 8x8 board (each cell assigned a color, each color appears 8x)
export function randomRegionBoard(size = 8): Color[][] {
  const colors = randomColors();
  // Fill with 8 regions, each color appears 8 times, random spots
  const colorCounts: Record<Color, number> = {};
  colors.forEach(c => colorCounts[c] = 0);

  const flat: Color[] = [];
  for (const c of colors) for (let i = 0; i < size; i++) flat.push(c);

  // Shuffle
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }

  const board: Color[][] = [];
  for (let r = 0; r < size; r++) {
    board.push(flat.slice(r * size, (r + 1) * size));
  }
  return board;
}

// Initialize board state
export function newQueensGame(size = 8): QueensGameState {
  const regionColors = randomColors();
  const regionBoard = randomRegionBoard(size);

  const board: Board = [];
  for (let row = 0; row < size; row++) {
    board[row] = [];
    for (let col = 0; col < size; col++) {
      board[row][col] = {
        row, col,
        color: regionBoard[row][col],
        state: "empty"
      };
    }
  }
  return {
    board,
    size,
    colors: regionColors
  };
}

// Checks if placing a queen at (row, col) is valid
export function canPlaceQueen(state: QueensGameState, row: number, col: number): boolean {
  const { board } = state;
  const cell = board[row][col];
  if (cell.state !== "empty") return false;

  // Check row, col, color region, and 8-adjacents
  // 1 queen per row
  for (let c = 0; c < state.size; c++) {
    if (board[row][c].state === "queen") return false;
  }
  // 1 queen per col
  for (let r = 0; r < state.size; r++) {
    if (board[r][col].state === "queen") return false;
  }
  // 1 queen per color region
  for (let r = 0; r < state.size; r++) {
    for (let c = 0; c < state.size; c++) {
      if (board[r][c].color === cell.color && board[r][c].state === "queen") return false;
    }
  }
  // No queen in 8-adjacents
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr, nc = col + dc;
      if (nr >= 0 && nr < state.size && nc >= 0 && nc < state.size) {
        if (board[nr][nc].state === "queen") return false;
      }
    }
  }
  return true;
}

// Place a queen (if valid), return new state
export function placeQueen(state: QueensGameState, row: number, col: number): QueensGameState {
  if (!canPlaceQueen(state, row, col)) return state;
  const board = state.board.map(rowCells =>
    rowCells.map(cell => ({ ...cell }))
  );
  board[row][col].state = "queen";
  return { ...state, board };
}

// Remove a queen
export function removeQueen(state: QueensGameState, row: number, col: number): QueensGameState {
  if (state.board[row][col].state !== "queen") return state;
  const board = state.board.map(rowCells =>
    rowCells.map(cell => ({ ...cell }))
  );
  board[row][col].state = "empty";
  return { ...state, board };
}

// Toggle a block (X)
export function toggleBlock(state: QueensGameState, row: number, col: number): QueensGameState {
  const board = state.board.map(rowCells =>
    rowCells.map(cell => ({ ...cell }))
  );
  const cur = board[row][col].state;
  if (cur === "blocked") board[row][col].state = "empty";
  else if (cur === "empty") board[row][col].state = "blocked";
  // if queen, do nothing
  return { ...state, board };
}

// Check win: 8 queens and all constraints satisfied
export function checkWin(state: QueensGameState): boolean {
  const { board, size } = state;
  let queenCount = 0;
  const rowQ = Array(size).fill(0);
  const colQ = Array(size).fill(0);
  const colorQ: Record<Color, number> = {};
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = board[row][col];
      if (cell.state === "queen") {
        queenCount++;
        rowQ[row]++;
        colQ[col]++;
        colorQ[cell.color] = (colorQ[cell.color] || 0) + 1;
        // Check 8-adjacents
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = row + dr, nc = col + dc;
            if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
              if (board[nr][nc].state === "queen") return false;
            }
          }
        }
      }
    }
  }
  if (queenCount !== size) return false;
  // check constraints
  if (rowQ.some(q => q !== 1)) return false;
  if (colQ.some(q => q !== 1)) return false;
  if (Object.values(colorQ).some(q => q !== 1)) return false;
  return true;
}