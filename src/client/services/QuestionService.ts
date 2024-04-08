/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_Question_create_question } from '../models/Body_Question_create_question';
import type { Body_Question_create_questions } from '../models/Body_Question_create_questions';
import type { Body_Question_update_questions } from '../models/Body_Question_update_questions';
import type { QuestionCreateBulkResponse } from '../models/QuestionCreateBulkResponse';
import type { QuestionDeleteBulkResponse } from '../models/QuestionDeleteBulkResponse';
import type { QuestionId } from '../models/QuestionId';
import type { QuestionResponse } from '../models/QuestionResponse';
import type { QuestionSetRequest } from '../models/QuestionSetRequest';
import type { QuestionUpdateBulkResponse } from '../models/QuestionUpdateBulkResponse';
import type { QuestionWithListAnswerCreateResponse } from '../models/QuestionWithListAnswerCreateResponse';
import type { QuestionWithListAnswerDeleteResponse } from '../models/QuestionWithListAnswerDeleteResponse';
import type { QuestionWithListAnswerUpdate } from '../models/QuestionWithListAnswerUpdate';
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
    /**
     * Update Question
     * @returns QuestionWithListAnswerCreateResponse Successful Response
     * @throws ApiError
     */
    public static questionUpdateQuestion({
        requestBody,
    }: {
        requestBody: QuestionWithListAnswerUpdate,
    }): CancelablePromise<QuestionWithListAnswerCreateResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/question_set/question',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Question
     * @returns QuestionWithListAnswerCreateResponse Successful Response
     * @throws ApiError
     */
    public static questionCreateQuestion({
        formData,
    }: {
        formData: Body_Question_create_question,
    }): CancelablePromise<QuestionWithListAnswerCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question_set/question',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Questions
     * @returns QuestionUpdateBulkResponse Successful Response
     * @throws ApiError
     */
    public static questionUpdateQuestions({
        formData,
    }: {
        formData: Body_Question_update_questions,
    }): CancelablePromise<QuestionUpdateBulkResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/question_set/question/bulk',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Questions
     * @returns QuestionCreateBulkResponse Successful Response
     * @throws ApiError
     */
    public static questionCreateQuestions({
        formData,
    }: {
        formData: Body_Question_create_questions,
    }): CancelablePromise<QuestionCreateBulkResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question_set/question/bulk',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Questions
     * @returns QuestionDeleteBulkResponse Successful Response
     * @throws ApiError
     */
    public static questionDeleteQuestions({
        requestBody,
    }: {
        requestBody: Array<QuestionId>,
    }): CancelablePromise<QuestionDeleteBulkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/question_set/question/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Question
     * @returns QuestionWithListAnswerDeleteResponse Successful Response
     * @throws ApiError
     */
    public static questionDeleteQuestion({
        questionId,
    }: {
        questionId: number,
    }): CancelablePromise<QuestionWithListAnswerDeleteResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/question_set/question/{question_id}',
            path: {
                'question_id': questionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
