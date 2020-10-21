"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Client_Functions_1 = require("./Client.Functions");
const ClientSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfEntry: { type: Date, default: new Date() },
    lastUpdated: { type: Date, default: new Date() },
});
ClientSchema.methods.saveAndUpdate = Client_Functions_1.saveAndUpdate;
ClientSchema.methods.verifyPassword = Client_Functions_1.verifyPassword;
ClientSchema.statics.createNewUser = Client_Functions_1.createNewUser;
ClientSchema.pre("save", Client_Functions_1.saveAndUpdate);
exports.default = ClientSchema;
//# sourceMappingURL=Client.Schema.js.map