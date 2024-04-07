/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnswerCreateFailed } from './AnswerCreateFailed';
import type { AnswerResponse } from './AnswerResponse';
export type AnswerCreateBulkResponse = {
    success?: (Array<AnswerResponse> | null);
    failed?: (Array<AnswerCreateFailed> | null);
};

