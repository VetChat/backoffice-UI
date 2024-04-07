/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerResponse } from './AnswerResponse';
import type { AnswerUpdateFailed } from './AnswerUpdateFailed';
export type AnswerUpdateBulkResponse = {
    success?: (Array<AnswerResponse> | null);
    failed?: (Array<AnswerUpdateFailed> | null);
};

