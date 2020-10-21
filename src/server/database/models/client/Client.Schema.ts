import { Schema } from "mongoose";
import { createNewUser, saveAndUpdate, verifyPassword } from "./Client.Functions";

const ClientSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfEntry: { type: Date, default: new Date() },
    lastUpdated: { type: Date, default: new Date() },
});

ClientSchema.methods.saveAndUpdate = saveAndUpdate;
ClientSchema.methods.verifyPassword = verifyPassword;

ClientSchema.statics.createNewUser = createNewUser;

ClientSchema.pre("save", saveAndUpdate);

export default ClientSchema;
