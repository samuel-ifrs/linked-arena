import { Server, Socket } from 'socket.io';
import { QueensGame } from 'shared/src/queens';

export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    const userRoom = socket.id;

    socket.on('request_new_queens_game', () => {
      const game = new QueensGame();
      socket.join(userRoom);
      io.to(userRoom).emit('receive_queens_game', {
        board: game.board.cells.map(row => row.map(cell => ({
          row: cell.row,
          col: cell.col,
          color: cell.color,
          state: cell.state
        }))),
        size: game.board.size
      });
    });

    socket.on('disconnect', () => {});
  });
}