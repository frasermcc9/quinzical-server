import { Question } from "./Question";
declare class QuestionBankImpl implements QuestionBank {
    private categories;
    constructor();
    getQuestion(): Question;
}
interface QuestionBank {
    getQuestion(): Question;
}
export { QuestionBank, QuestionBankImpl };
//# sourceMappingURL=QuestionBank.d.ts.map