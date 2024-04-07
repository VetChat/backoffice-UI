/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionCreateFailedResponse } from './QuestionCreateFailedResponse';
import type { QuestionWithListAnswerCreateResponse } from './QuestionWithListAnswerCreateResponse';
export type QuestionCreateBulkResponse = {
    success?: (Array<QuestionWithListAnswerCreateResponse> | null);
    failed?: (Array<QuestionCreateFailedResponse> | null);
};

