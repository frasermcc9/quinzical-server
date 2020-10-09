"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionImpl = void 0;
class QuestionImpl {
    constructor($solutions, $question, $prompt) {
        this.solution = $solutions;
        this.question = $question;
        this.prompt = $prompt;
    }
    getSendableData() {
        return {
            prompt: this.prompt,
            question: this.question,
        };
    }
    get Solution() {
        return this.solution;
    }
    get Question() {
        return this.question;
    }
    get Prompt() {
        return this.prompt;
    }
    static create({ prompt, question, solutions }) {
        return new QuestionImpl(solutions, question, prompt);
    }
}
exports.QuestionImpl = QuestionImpl;
//# sourceMappingURL=Question.js.map