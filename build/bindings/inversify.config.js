"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoCContainer = void 0;
const inversify_1 = require("inversify");
const Log_1 = __importDefault(require("../helpers/Log"));
const Timer_1 = require("../helpers/Timer");
const ActiveQuestionManager_1 = require("../model/ActiveQuestionManager");
const Game_1 = require("../model/Game");
const GameRegister_1 = require("../model/GameRegister");
const Player_1 = require("../model/Player");
const QuestionBank_1 = require("../model/Questions/QuestionBank");
const Express_1 = require("../server/Express");
const Socket_1 = require("../server/Socket");
const IdGenerator_1 = require("../util/strategies/IdGenerator");
const types_1 = require("./types");
const mainContainer = new inversify_1.Container();
exports.IoCContainer = mainContainer;
mainContainer.bind(types_1.TYPES.SocketManager).to(Socket_1.SocketManagerImpl).inSingletonScope();
mainContainer.bind(types_1.TYPES.GameRegister).to(GameRegister_1.GameRegisterImpl).inSingletonScope();
mainContainer.bind(types_1.TYPES.QuestionBank).to(QuestionBank_1.QuestionBankImpl).inSingletonScope();
mainContainer.bind(types_1.TYPES.IDGeneratorContext).to(IdGenerator_1.IdGeneratorContextImpl);
mainContainer.bind(types_1.TYPES.ActiveQuestionManager).to(ActiveQuestionManager_1.ActiveQuestionManagerImpl);
mainContainer.bind(types_1.TYPES.Log).to(Log_1.default);
mainContainer.bind(types_1.TYPES.Timer).to(Timer_1.TimerImpl);
mainContainer.bind("console").toConstantValue(console);
mainContainer.bind("process").toConstantValue(process);
mainContainer.bind(types_1.TYPES.ExpressManager).to(Express_1.ExpressManager).inSingletonScope();
mainContainer.bind(types_1.FACTORIES.GameFactory).toFactory((context) => {
    return (type) => {
        switch (type) {
            case "GAME":
                return context.container.resolve(Game_1.GameImpl);
            default:
                throw new TypeError(`${type}: No such GAME found.`);
        }
    };
});
mainContainer.bind("PlayerConstructor").toConstructor(Player_1.PlayerImpl);
mainContainer.bind("PlayerFactory").toFactory((context) => {
    return (name, client) => {
        const constructor = context.container.get("PlayerConstructor");
        return new constructor(name, client);
    };
});
//# sourceMappingURL=inversify.config.js.map