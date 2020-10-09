declare class QuestionImpl implements Question {
    private solution;
    private question;
    private prompt;
    private constructor();
    getSendableData(): SendableQuestionData;
    get Solution(): string[];
    get Question(): string;
    get Prompt(): string;
    static create({ prompt, question, solutions }: QuestionData): Question;
}
interface Question {
    Solution: string[];
    Question: string;
    Prompt: string;
    getSendableData(): SendableQuestionData;
}
interface QuestionData extends SendableQuestionData {
    solutions: string[];
}
interface SendableQuestionData {
    question: string;
    prompt: string;
}
export { Question, QuestionImpl, SendableQuestionData };
//# sourceMappingURL=Question.d.ts.map