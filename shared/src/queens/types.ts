export type CellState = "empty" | "queen" | "blocked";

export interface ICell {
  row: number;
  col: number;
  color: string;
  state: CellState;
}

export interface IBoard {
  size: number;
  cells: Cell[][];
}

export interface IQueensGame {
  board: Board;
  isWin(): boolean;
  canPlaceQueen(row: number, col: number): boolean;
  placeQueen(row: number, col: number): void;
  removeQueen(row: number, col: number): void;
  toggleBlock(row: number, col: number): void;
}