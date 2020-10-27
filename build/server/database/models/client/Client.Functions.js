"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPlayer = exports.createNewUser = exports.addIncorrect = exports.addCorrect = exports.addXp = exports.getXp = exports.verifyPassword = exports.saveAndUpdate = void 0;
const Client_Model_1 = require("./Client.Model");
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
function getXp() {
    return this?.stats?.XP ?? 0;
}
exports.getXp = getXp;
async function addXp(amount) {
    verifyData(this);
    this.stats.XP = (this.stats?.XP ?? 0) + amount;
    await this.save();
}
exports.addXp = addXp;
async function addCorrect(amount) {
    verifyData(this);
    this.stats.correct = (this.stats?.correct ?? 0) + amount;
}
exports.addCorrect = addCorrect;
async function addIncorrect(amount) {
    verifyData(this);
    this.stats.incorrect = (this.stats?.incorrect ?? 0) + amount;
}
exports.addIncorrect = addIncorrect;
function verifyData(document) {
    if (document.stats == undefined) {
        document.stats = { XP: 0, correct: 0, incorrect: 0 };
    }
    if (document.stats.XP == undefined) {
        document.stats.XP = 0;
    }
    if (document.stats.correct == undefined) {
        document.stats.correct = 0;
    }
    if (document.stats.incorrect == undefined) {
        document.stats.incorrect = 0;
    }
}
//#endregion
//#region MODEL METHODS
async function createNewUser(username, password) {
    const newClient = this.create({
        username: username,
        password: password,
        stats: { XP: 0, correct: 0, incorrect: 0 },
    });
    return newClient;
}
exports.createNewUser = createNewUser;
async function findPlayer(name) {
    return await Client_Model_1.ClientModel.findOne({
        username: { $regex: new RegExp("^" + name.trim() + "$", "i") },
    });
}
exports.findPlayer = findPlayer;
//#endregion
//# sourceMappingURL=Client.Functions.js.map