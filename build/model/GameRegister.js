"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRegisterImpl = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../bindings/types");
let GameRegisterImpl = class GameRegisterImpl {
    constructor(log, idGenerator, gameFactory) {
        this.log = log;
        this.idGenerator = idGenerator;
        this.gameFactory = gameFactory;
        this.gameMap = new Map();
    }
    getPublicGames() {
        return Array.from(this.gameMap.values()).filter((f) => f.isPublic() && !f.isFull());
    }
    generateGame() {
        let id = this.idGenerator.generateIdStrategy("RANDOM").generateId();
        while (this.gameMap.has(id)) {
            id = this.idGenerator.generateIdStrategy("RANDOM").generateId();
        }
        const game = this.gameFactory("GAME");
        game.Code = id;
        this.gameMap.set(id, game);
        //delete the game when its finished
        game.on("gameEnd", () => this.gameMap.delete(id));
        return game;
    }
    findGame(gameId) {
        return this.gameMap.get(gameId);
    }
};
GameRegisterImpl.alphabet = "abcdefghijklmnopqrstuvwxyz";
GameRegisterImpl = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Log)),
    __param(1, inversify_1.inject(types_1.TYPES.IDGeneratorContext)),
    __param(2, inversify_1.inject(types_1.FACTORIES.GameFactory)),
    __metadata("design:paramtypes", [Object, Object, Function])
], GameRegisterImpl);
exports.GameRegisterImpl = GameRegisterImpl;
//# sourceMappingURL=GameRegister.js.map