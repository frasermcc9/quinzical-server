"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionBankImpl = void 0;
const inversify_1 = require("inversify");
const Question_1 = require("./Question");
const Questions_json_1 = __importDefault(require("./Questions.json"));
let QuestionBankImpl = class QuestionBankImpl {
    constructor() {
        this.categories = Questions_json_1.default;
    }
    getQuestion() {
        const keys = Object.keys(this.categories);
        const keysLength = keys.length;
        const rndIndex = ~~(Math.random() * keysLength);
        const selectedKey = keys[rndIndex];
        //@ts-ignore
        const questions = this.categories[selectedKey];
        const question = questions[~~(Math.random() * questions.length)];
        return Question_1.QuestionImpl.create({
            prompt: question.prompt,
            question: question.question,
            solutions: question.solution,
        });
    }
};
QuestionBankImpl = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], QuestionBankImpl);
exports.QuestionBankImpl = QuestionBankImpl;
//# sourceMappingURL=QuestionBank.js.map