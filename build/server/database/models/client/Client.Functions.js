"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.verifyPassword = exports.saveAndUpdate = void 0;
const bcrypt_1 = require("bcrypt");
const SALT_ROUNDS = 10;
//#region INSTANCE METHODS
async function saveAndUpdate(next) {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        if (this.isModified("password")) {
            const result = await bcrypt_1.hash(this.password, SALT_ROUNDS);
            this.password = result;
        }
        next();
    }
}
exports.saveAndUpdate = saveAndUpdate;
async function verifyPassword(given) {
    const result = await bcrypt_1.compare(given, this.password);
    return result;
}
exports.verifyPassword = verifyPassword;
//#endregion
//#region MODEL METHODS
async function createNewUser(username, password) {
    const newClient = this.create({ username: username, password: password });
    return newClient;
}
exports.createNewUser = createNewUser;
//#endregion
//# sourceMappingURL=Client.Functions.js.map