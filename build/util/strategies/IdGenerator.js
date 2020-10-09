"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGeneratorContextImpl = void 0;
const inversify_1 = require("inversify");
let IdGeneratorContextImpl = class IdGeneratorContextImpl {
    generateIdStrategy(type) {
        switch (type) {
            case "FIXED":
                return new FixedIdGenerator();
            case "RANDOM":
                return new RandomIdGenerator();
            default:
                throw new TypeError(`${type} is not a valid ID Generation Strategy.`);
        }
    }
};
IdGeneratorContextImpl = __decorate([
    inversify_1.injectable()
], IdGeneratorContextImpl);
exports.IdGeneratorContextImpl = IdGeneratorContextImpl;
class RandomIdGenerator {
    generateId() {
        let id = "";
        for (let i = 0; i < 4; i++) {
            const randomCharacter = RandomIdGenerator.alphabet[~~(Math.random() * RandomIdGenerator.alphabet.length)];
            id += randomCharacter;
        }
        return id.toUpperCase();
    }
}
RandomIdGenerator.alphabet = "abcdefghijklmnopqrstuvwxyz";
/**
 * Generates a fixed id of abcd
 */
class FixedIdGenerator {
    generateId() {
        return "ABCD";
    }
}
//# sourceMappingURL=IdGenerator.js.map