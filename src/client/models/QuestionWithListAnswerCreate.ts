/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerCreate } from './AnswerCreate';
export type QuestionWithListAnswerCreate = {
    questionSetId: number;
    question: string;
    pattern: string;
    imagePath?: (string | null);
    ordinal: number;
    listAnswer: Array<AnswerCreate>;
};

