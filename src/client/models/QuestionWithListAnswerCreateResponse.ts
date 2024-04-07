/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerCreateBulkResponse } from './AnswerCreateBulkResponse';
export type QuestionWithListAnswerCreateResponse = {
    questionId: number;
    question: string;
    pattern: string;
    imagePath?: (string | null);
    ordinal: number;
    listAnswer: AnswerCreateBulkResponse;
    message: string;
};

