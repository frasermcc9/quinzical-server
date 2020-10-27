"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const Client_Schema_1 = __importDefault(require("./Client.Schema"));
exports.ClientModel = mongoose_1.model("players", Client_Schema_1.default);
//# sourceMappingURL=Client.Model.js.map
