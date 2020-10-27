"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Client_Functions_1 = require("./Client.Functions");
const ClientSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    stats: {
        XP: { type: Number },
        correct: { type: Number },
        incorrect: { type: Number },
    },
    dateOfEntry: { type: Date, default: new Date() },
    lastUpdated: { type: Date, default: new Date() },
});
ClientSchema.methods.saveAndUpdate = Client_Functions_1.saveAndUpdate;
ClientSchema.methods.verifyPassword = Client_Functions_1.verifyPassword;
ClientSchema.methods.addXp = Client_Functions_1.addXp;
ClientSchema.methods.getXp = Client_Functions_1.getXp;
ClientSchema.methods.addCorrect = Client_Functions_1.addCorrect;
ClientSchema.methods.addIncorrect = Client_Functions_1.addIncorrect;
ClientSchema.statics.createNewUser = Client_Functions_1.createNewUser;
ClientSchema.statics.findPlayer = Client_Functions_1.findPlayer;
ClientSchema.pre("save", Client_Functions_1.saveAndUpdate);
exports.default = ClientSchema;
//# sourceMappingURL=Client.Schema.js.map