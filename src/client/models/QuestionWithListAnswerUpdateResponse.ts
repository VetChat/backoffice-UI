/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerUpdateBulkResponse } from './AnswerUpdateBulkResponse';
export type QuestionWithListAnswerUpdateResponse = {
    questionId: number;
    question: string;
    pattern: string;
    imagePath?: (string | null);
    ordinal: number;
    listAnswer: AnswerUpdateBulkResponse;
    message: string;
};

