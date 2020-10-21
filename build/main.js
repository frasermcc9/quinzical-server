"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const inversify_1 = require("inversify");
const inversify_config_1 = require("./bindings/inversify.config");
const types_1 = require("./bindings/types");
const Database_1 = require("./server/database/Database");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);
const application = express_1.default();
const server = http_1.createServer(application);
server.listen(7373, () => {
    console.log("Server Listening on port 7373");
});
inversify_config_1.IoCContainer.bind(types_1.TYPES.Server).toConstantValue(server);
inversify_config_1.IoCContainer.bind(types_1.TYPES.Express).toConstantValue(application);
const socketManager = inversify_config_1.IoCContainer.get(types_1.TYPES.SocketManager);
const expressManager = inversify_config_1.IoCContainer.get(types_1.TYPES.ExpressManager);
Database_1.connect();
//# sourceMappingURL=main.js.map