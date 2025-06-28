import { QueensGame } from './Game';

describe('QueensGame', () => {
  it('cria um board 8x8', () => {
    const game = new QueensGame();
    expect(game.board.cells.length).toBe(8);
    expect(game.board.cells[0].length).toBe(8);
  });

  it('não deixa colocar duas rainhas na mesma linha', () => {
    const game = new QueensGame();
    game.placeQueen(0, 0);
    expect(game.canPlaceQueen(0, 1)).toBe(false);
  });

  it('deixa colocar uma rainha válida', () => {
    const game = new QueensGame();
    expect(game.canPlaceQueen(0, 0)).toBe(true);
    game.placeQueen(0, 0);
    expect(game.board.cells[0][0].state).toBe('queen');
  });
});