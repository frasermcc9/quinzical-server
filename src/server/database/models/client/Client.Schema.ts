import { Schema } from "mongoose";
import {
    addCorrect,
    addIncorrect,
    addXp,
    createNewUser,
    findPlayer,
    getXp,
    saveAndUpdate,
    verifyPassword,
} from "./Client.Functions";

const ClientSchema = new Schema({
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

ClientSchema.methods.saveAndUpdate = saveAndUpdate;
ClientSchema.methods.verifyPassword = verifyPassword;

ClientSchema.methods.addXp = addXp;
ClientSchema.methods.getXp = getXp;
ClientSchema.methods.addCorrect = addCorrect;
ClientSchema.methods.addIncorrect = addIncorrect;

ClientSchema.statics.createNewUser = createNewUser;
ClientSchema.statics.findPlayer = findPlayer;

ClientSchema.pre("save", saveAndUpdate);

export default ClientSchema;
