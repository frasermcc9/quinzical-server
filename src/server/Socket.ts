import { inject, injectable } from "inversify";
import * as io from "socket.io";
import { TYPES } from "../bindings/types";
import { Log } from "../helpers/Log";
import { GameRegister } from "../model/GameRegister";
import { GameSettings } from "../model/Game";
import { ClientModel } from "./database/models/client/Client.Model";
import { Server } from "http";

const socketioAuth = require("socketio-auth");

@injectable()
class SocketManagerImpl {
    private ioServer: io.Server;

    constructor(
        @inject(TYPES.Log) private readonly log: Log,
        @inject(TYPES.GameRegister) private readonly gameRegister: GameRegister,
        @inject(TYPES.Server) private readonly server: Server
    ) {
        this.ioServer = io.default(this.server);

        socketioAuth(this.ioServer, { authenticate: this.authenticate, postAuthenticate: this.postAuthenticate });

        this.ioServer.on("connection", (client) => {
            log.trace("SocketManagerImpl", "Client connected to server");
        });
    }

    private postAuthenticate = (client: ioClientUsername) => {
        this.log.trace("SocketManagerImpl", `${client.username} authenticated with server`);

        client.emit("ready");

        client.on("disconnect", () => {
            this.log.trace("SocketManagerImpl", "Client disconnected from server.");
        });

        client.on("hostGameRequest", (name: string = "", gameSettings: GameSettings = {}) => {
            const game = this.gameRegister.generateGame();
            game.setGameSettings(gameSettings);

            (client as EmittableEvents).emit("gameHostGiven", game.Code);
            client.on("clientReady", () => {
                game.addHostPlayer(name, client);
            });

            this.log.trace("SocketManagerImpl", `New Game Initiated by ${name} with code ${game.Code}`);
        });

        client.on("joinGameRequest", (name: string, id: string) => {
            const game = this.gameRegister.findGame(id);

            if (game === undefined) {
                client.emit("joinGameNotification", false, "Game was not found.");
                return this.log.trace("SocketManagerImpl", `${name} tried to join game with code ${id}.`);
            }

            if (game.isFull()) {
                client.emit("joinGameNotification", false, "Game is full.");
                return this.log.trace("SocketManagerImpl", `${name} tried to join game with code ${id}.`);
            }

            if (game.getPlayerNames().includes(name)) {
                client.emit("joinGameNotification", false, "Someone already has that name.");
                return this.log.trace("SocketManagerImpl", `${name} tried to join game with code ${id}.`);
            }

            client.emit("joinGameNotification", true, game.getPlayerNames());
            client.once("clientReady", () => {
                game.addPlayer(name, client);
                this.log.trace("SocketManagerImpl", `${name} joined game joined with code ${id}.`);
            });
        });

        client.on("browseGames", () => {
            const games = this.gameRegister.getPublicGames();
            const transmitData = games.map((g) => g.getGameInfo());
            client.emit("browseGameDataLoaded", transmitData);
        });
    };

    private authenticate = async (
        client: ioClientUsername,
        data: { username: string; password: string },
        callback: (...args: any) => void
    ) => {
        const { username, password } = data;
        const foundUser = await ClientModel.findOne({
            username: { $regex: new RegExp("^" + username.trim() + "$", "i") },
        });
        if (!foundUser) return callback(new Error("User Doesn't Exist"));

        const result = await foundUser.verifyPassword(password);
        if (result) client.emit("username", foundUser.username);
        client.username = foundUser.username;

        return callback(null, result);
    };
}

interface SocketManager {}

export { SocketManager, SocketManagerImpl };

declare interface EmittableEvents extends io.Socket {
    emit(event: "gameHostGiven", code: string): boolean;
}

interface ioClientUsername extends io.Socket {
    username: string;
}
