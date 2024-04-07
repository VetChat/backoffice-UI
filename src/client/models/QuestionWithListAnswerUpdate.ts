/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerUpdate } from './AnswerUpdate';
export type QuestionWithListAnswerUpdate = {
    questionId: number;
    question: string;
    pattern: string;
    imagePath?: (string | null);
    ordinal: number;
    listAnswer: Array<AnswerUpdate>;
};

