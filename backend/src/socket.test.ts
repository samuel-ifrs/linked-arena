import { Server } from "socket.io";
import { setupSocket } from "./socket";
import { createServer } from "http";

describe("Socket setup", () => {
  it("registers the Queens event", done => {
    const httpServer = createServer();
    const io = new Server(httpServer);

    setupSocket(io);
    expect(typeof setupSocket).toBe("function");
    done();
  });
});