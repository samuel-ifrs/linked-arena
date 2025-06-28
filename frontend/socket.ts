import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";
let socket: Socket | null = null;

export function connectSocket() {
  if (!socket) socket = io(SERVER_URL);
  return socket;
}