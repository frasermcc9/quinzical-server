import { inject, injectable } from "inversify";
import * as io from "socket.io";
import { createServer, Server } from "http";
import { TYPES } from "../bindings/types";
import { Log } from "../helpers/Log";
import { GameRegister } from "../model/GameRegister";
import { GameSettings } from "../model/Game";

@injectable()
class SocketManagerImpl {
    public static readonly PORT = 7373;

    private ioServer: io.Server;

    constructor(
        @inject(TYPES.Log) private readonly log: Log,
        @inject(TYPES.GameRegister) private readonly gameRegister: GameRegister
    ) {
        const server: Server = createServer();
        this.ioServer = io.default(server);

        this.ioServer.listen(SocketManagerImpl.PORT);

        this.ioServer.on("connection", (client) => {
            log.trace("SocketManagerImpl", "Client connected to server");

            client.on("hostGameRequest", (name: string = "", gameSettings: GameSettings = {}) => {
                const game = gameRegister.generateGame();
                game.setGameSettings(gameSettings);
                game.addPlayer(name, client);

                (client as EmittableEvents).emit("gameHostGiven", game.Code);

                log.trace("SocketManagerImpl", `New Game Initiated by ${name}.`);
            });

            client.on("joinGameRequest", (name: string, id: string) => {
                const game = gameRegister.findGame(id);
                if (!game) return log.trace("SocketManagerImpl", `${name} tried to join game with code ${id}.`);

                game.addPlayer(name, client);

                log.trace("SocketManagerImpl", `${name} joined game joined with code ${id}.`);
            });
        });
    }

    private listenToClient() {}
}

interface SocketManager {}

export { SocketManager, SocketManagerImpl };

declare interface EmittableEvents extends io.Socket {
    emit(event: "gameHostGiven", code: string): boolean;
}
