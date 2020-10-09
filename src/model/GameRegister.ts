import { inject, injectable } from "inversify";
import { FACTORIES, TYPES } from "../bindings/types";
import { Log } from "../helpers/Log";
import { IdGenerationContext } from "../util/strategies/IdGenerator";
import { Game, GameImpl } from "./Game";

@injectable()
class GameRegisterImpl implements GameRegister {
    static alphabet: string = "abcdefghijklmnopqrstuvwxyz";

    private gameMap: Map<string, Game>;

    constructor(
        @inject(TYPES.Log) private readonly log: Log,
        @inject(TYPES.IDGeneratorContext) private readonly idGenerator: IdGenerationContext,
        @inject(FACTORIES.GameFactory) private readonly gameFactory: (type: string) => Game
    ) {
        this.gameMap = new Map();
    }

    generateGame(): Game {
        let id = this.idGenerator.generateIdStrategy("RANDOM").generateId();
        while (this.gameMap.has(id)) {
            id = this.idGenerator.generateIdStrategy("RANDOM").generateId();
        }

        const game: Game = this.gameFactory("GAME");
        
        game.Code = id;
        this.gameMap.set(id, game);

        return game;
    }

    findGame(gameId: string): Game | undefined {
        return this.gameMap.get(gameId);
    }
}

interface GameRegister {
    generateGame(): Game;

    findGame(gameId: string): Game | undefined;
}

export { GameRegister, GameRegisterImpl };
