import { Log } from "../helpers/Log";
import { Player } from "./Player";
import { Question } from "./Questions/Question";
declare class ActiveQuestionManagerImpl implements ActiveQuestionManager {
    private readonly log;
    private question?;
    private playerMap;
    constructor(log: Log);
    addPlayers(players: Player[]): void;
    removePlayer(player: Player): void;
    setNewQuestion(question: Question): void;
    isAllAnswered(): boolean;
    answerQuestion(solution: string, player: Player, timeRatio: number): void;
    get CorrectAnswer(): string;
    /**
     * Calculates the bonus points based on how quickly the user answered the
     * question.
     *
     * 500 points is allocated for getting the question correct. A theoretical
     * maximum of 500 points is allocated for speed.
     *
     * @param timeRatio Ratio of timing remaining (i.e. 1 is instant answer, 0
     * is answered just as time ran out).
     */
    private calculatePoints;
}
interface ActiveQuestionManager {
    addPlayers(players: Player[]): void;
    setNewQuestion(question: Question): void;
    isAllAnswered(): boolean;
    answerQuestion(solution: string, player: Player, timeRatio: number): void;
    removePlayer(player: Player): void;
    CorrectAnswer: string;
}
export { ActiveQuestionManager, ActiveQuestionManagerImpl };
//# sourceMappingURL=ActiveQuestionManager.d.ts.map