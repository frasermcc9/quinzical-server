"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManagerImpl = void 0;
const inversify_1 = require("inversify");
const io = __importStar(require("socket.io"));
const types_1 = require("../bindings/types");
const Client_Model_1 = require("./database/models/client/Client.Model");
const http_1 = require("http");
const socketioAuth = require("socketio-auth");
let SocketManagerImpl = class SocketManagerImpl {
    constructor(log, gameRegister, server) {
        this.log = log;
        this.gameRegister = gameRegister;
        this.server = server;
        this.postAuthenticate = (client) => {
            this.log.trace("SocketManagerImpl", `${client.username} authenticated with server`);
            client.emit("ready");
            client.on("disconnect", () => {
                this.log.trace("SocketManagerImpl", "Client disconnected from server.");
            });
            client.on("hostGameRequest", (name = "", gameSettings = {}) => {
                const game = this.gameRegister.generateGame();
                game.setGameSettings(gameSettings);
                client.emit("gameHostGiven", game.Code);
                client.on("clientReady", () => {
                    game.addHostPlayer(name, client);
                });
                this.log.trace("SocketManagerImpl", `New Game Initiated by ${name} with code ${game.Code}`);
            });
            client.on("joinGameRequest", (name, id) => {
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
        this.authenticate = async (client, data, callback) => {
            const { username, password } = data;
            const foundUser = await Client_Model_1.ClientModel.findOne({
                username: { $regex: new RegExp("^" + username.trim() + "$", "i") },
            });
            if (!foundUser)
                return callback(new Error("User Doesn't Exist"));
            const result = await foundUser.verifyPassword(password);
            if (result)
                client.emit("username", foundUser.username);
            client.username = foundUser.username;
            return callback(null, result);
        };
        this.ioServer = io.default(this.server);
        socketioAuth(this.ioServer, { authenticate: this.authenticate, postAuthenticate: this.postAuthenticate });
        this.ioServer.on("connection", (client) => {
            log.trace("SocketManagerImpl", "Client connected to server");
        });
    }
};
SocketManagerImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Log)),
    __param(1, inversify_1.inject(types_1.TYPES.GameRegister)),
    __param(2, inversify_1.inject(types_1.TYPES.Server)),
    __metadata("design:paramtypes", [Object, Object, http_1.Server])
], SocketManagerImpl);
exports.SocketManagerImpl = SocketManagerImpl;
//# sourceMappingURL=Socket.js.map