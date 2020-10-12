"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const inversify_1 = require("inversify");
const inversify_config_1 = require("./bindings/inversify.config");
const types_1 = require("./bindings/types");
inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);
const socketManager = inversify_config_1.IoCContainer.get(types_1.TYPES.SocketManager);
//# sourceMappingURL=main.js.map