import { ICell, CellState } from "./types";

export class Cell implements ICell {
  row: number;
  col: number;
  color: string;
  state: CellState;

  constructor(row: number, col: number, color: string, state: CellState = "empty") {
    this.row = row;
    this.col = col;
    this.color = color;
    this.state = state;
  }

  clone(): Cell {
    return new Cell(this.row, this.col, this.color, this.state);
  }
}