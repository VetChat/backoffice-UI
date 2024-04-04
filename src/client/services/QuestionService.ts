/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionResponse } from '../models/QuestionResponse';
import type { QuestionSetRequest } from '../models/QuestionSetRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionService {
    /**
     * Get Questions By Set Ids
     * @returns QuestionResponse Successful Response
     * @throws ApiError
     */
    public static questionGetQuestionsBySetIds({
        requestBody,
    }: {
        requestBody: Array<QuestionSetRequest>,
    }): CancelablePromise<Array<QuestionResponse>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/questions/question_set_ids',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
