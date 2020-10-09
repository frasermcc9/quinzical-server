class QuestionImpl implements Question {
    private solution: string;
    private question: string;
    private prompt: string;

    private constructor($solution: string, $question: string, $prompt: string) {
        this.solution = $solution;
        this.question = $question;
        this.prompt = $prompt;
    }

    getSendableData(): SendableQuestionData {
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

    static create({ prompt, question, solution }: QuestionData): Question {
        return new QuestionImpl(solution, question, prompt);
    }
}

interface Question {
    Solution: string;
    Question: string;
    Prompt: string;

    getSendableData(): SendableQuestionData;
}

interface QuestionData extends SendableQuestionData {
    solution: string;
}

interface SendableQuestionData {
    question: string;
    prompt: string;
}

export { Question, QuestionImpl, SendableQuestionData };
