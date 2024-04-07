/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionUpdateFailedResponse } from './QuestionUpdateFailedResponse';
import type { QuestionWithListAnswerUpdateResponse } from './QuestionWithListAnswerUpdateResponse';
export type QuestionUpdateBulkResponse = {
    success?: (Array<QuestionWithListAnswerUpdateResponse> | null);
    failed?: (Array<QuestionUpdateFailedResponse> | null);
};

