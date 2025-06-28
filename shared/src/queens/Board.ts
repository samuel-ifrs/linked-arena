import { IBoard } from "./types";
import { Cell } from "./Cell";

function randomColors(): string[] {
  const palette = [
    "#7a81ff", "#ffe188", "#ffb0b0",
    "#baffc9", "#b8f3ff", "#ffb6e1",
    "#bdb2ff", "#ffd6a5"
  ];
  for (let i = palette.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [palette[i], palette[j]] = [palette[j], palette[i]];
  }
  return palette;
}

function randomRegionBoard(size: number, colors: string[]): string[][] {
  const flat: string[] = [];
  for (const c of colors) for (let i = 0; i < size; i++) flat.push(c);
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }
  const board: string[][] = [];
  for (let r = 0; r < size; r++) {
    board.push(flat.slice(r * size, (r + 1) * size));
  }
  return board;
}

export class Board implements IBoard {
  size: number;
  cells: Cell[][];

  constructor(size: number = 8, regionColors?: string[], regionBoard?: string[][]) {
    this.size = size;
    const colors = regionColors ?? randomColors();
    const colorBoard = regionBoard ?? randomRegionBoard(size, colors);
    this.cells = [];
    for (let r = 0; r < size; r++) {
      this.cells[r] = [];
      for (let c = 0; c < size; c++) {
        this.cells[r][c] = new Cell(r, c, colorBoard[r][c]);
      }
    }
  }

  clone(): Board {
    const newBoard = new Board(this.size);
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        newBoard.cells[r][c] = this.cells[r][c].clone();
      }
    }
    return newBoard;
  }
}