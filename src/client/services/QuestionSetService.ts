/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionList } from '../models/QuestionList';
import type { QuestionSetCreateBody } from '../models/QuestionSetCreateBody';
import type { QuestionSetResponse } from '../models/QuestionSetResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionSetService {
    /**
     * Get Question Set By Question Set Id
     * @returns QuestionList Successful Response
     * @throws ApiError
     */
    public static getQuestionSetByQuestionSetIdQuestionSetQuestionSetIdGet({
        questionSetId,
    }: {
        questionSetId: number,
    }): CancelablePromise<Array<QuestionList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question_set/{question_set_id}',
            path: {
                'question_set_id': questionSetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Question Set
     * @returns QuestionSetResponse Successful Response
     * @throws ApiError
     */
    public static deleteQuestionSetQuestionSetQuestionSetIdDelete({
        questionSetId,
    }: {
        questionSetId: number,
    }): CancelablePromise<QuestionSetResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/question_set/{question_set_id}',
            path: {
                'question_set_id': questionSetId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Question Set
     * @returns QuestionSetResponse Successful Response
     * @throws ApiError
     */
    public static addQuestionSetQuestionSetPost({
        requestBody,
    }: {
        requestBody: QuestionSetCreateBody,
    }): CancelablePromise<QuestionSetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question_set',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
