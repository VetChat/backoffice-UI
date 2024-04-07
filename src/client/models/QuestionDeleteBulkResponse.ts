/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionUpdateFailedResponse } from './QuestionUpdateFailedResponse';
import type { QuestionWithListAnswerDeleteResponse } from './QuestionWithListAnswerDeleteResponse';
export type QuestionDeleteBulkResponse = {
    success?: (Array<QuestionWithListAnswerDeleteResponse> | null);
    failed?: (Array<QuestionUpdateFailedResponse> | null);
};

