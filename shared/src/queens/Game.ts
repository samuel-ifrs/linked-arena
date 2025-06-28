import { CellState, IQueensGame } from "./types";
import { Board } from "./Board";

export class QueensGame implements IQueensGame {
  board: Board;

  constructor(size: number = 8) {
    this.board = new Board(size);
  }

  canPlaceQueen(row: number, col: number): boolean {
    const cell = this.board.cells[row][col];
    if (cell.state !== "empty") return false;
    for (let i = 0; i < this.board.size; i++) {
      if (this.board.cells[row][i].state === "queen") return false;
      if (this.board.cells[i][col].state === "queen") return false;
    }
    const color = cell.color;
    for (let r = 0; r < this.board.size; r++) {
      for (let c = 0; c < this.board.size; c++) {
        if (this.board.cells[r][c].color === color && this.board.cells[r][c].state === "queen") return false;
      }
    }
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < this.board.size && nc >= 0 && nc < this.board.size) {
          if (this.board.cells[nr][nc].state === "queen") return false;
        }
      }
    }
    return true;
  }

  placeQueen(row: number, col: number): void {
    if (this.canPlaceQueen(row, col)) {
      this.board.cells[row][col].state = "queen";
    }
  }

  removeQueen(row: number, col: number): void {
    if (this.board.cells[row][col].state === "queen") {
      this.board.cells[row][col].state = "empty";
    }
  }

  toggleBlock(row: number, col: number): void {
    const cell = this.board.cells[row][col];
    if (cell.state === "queen") return;
    cell.state = cell.state === "blocked" ? "empty" : "blocked";
  }

  isWin(): boolean {
    let queenCount = 0;
    const rowQ = Array(this.board.size).fill(0);
    const colQ = Array(this.board.size).fill(0);
    const colorQ: Record<string, number> = {};
    for (let r = 0; r < this.board.size; r++) {
      for (let c = 0; c < this.board.size; c++) {
        const cell = this.board.cells[r][c];
        if (cell.state === "queen") {
          queenCount++;
          rowQ[r]++;
          colQ[c]++;
          colorQ[cell.color] = (colorQ[cell.color] || 0) + 1;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < this.board.size && nc >= 0 && nc < this.board.size) {
                if (this.board.cells[nr][nc].state === "queen") return false;
              }
            }
          }
        }
      }
    }
    if (queenCount !== this.board.size) return false;
    if (rowQ.some(q => q !== 1)) return false;
    if (colQ.some(q => q !== 1)) return false;
    if (Object.values(colorQ).some(q => q !== 1)) return false;
    return true;
  }

  resetBoard(): void {
    for (let r = 0; r < this.board.size; r++) {
      for (let c = 0; c < this.board.size; c++) {
        this.board.cells[r][c].state = "empty";
      }
    }
  }
}