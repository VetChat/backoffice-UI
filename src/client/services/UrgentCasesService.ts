/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UrgentCaseBulkResponse } from '../models/UrgentCaseBulkResponse';
import type { UrgentCaseCreate } from '../models/UrgentCaseCreate';
import type { UrgentCaseId } from '../models/UrgentCaseId';
import type { UrgentCaseResponse } from '../models/UrgentCaseResponse';
import type { UrgentCaseUpdate } from '../models/UrgentCaseUpdate';
import type { UrgentCaseWithUrgency } from '../models/UrgentCaseWithUrgency';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UrgentCasesService {
    /**
     * Get All Urgent Cases
     * @returns UrgentCaseWithUrgency Successful Response
     * @throws ApiError
     */
    public static urgentCasesGetAllUrgentCases(): CancelablePromise<Array<UrgentCaseWithUrgency>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/urgent_cases/',
        });
    }
    /**
     * Get Urgent Cases By Animal Id
     * @returns UrgentCaseWithUrgency Successful Response
     * @throws ApiError
     */
    public static urgentCasesGetUrgentCasesByAnimalId({
        animalId,
    }: {
        animalId: number,
    }): CancelablePromise<Array<UrgentCaseWithUrgency>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/animal/{animal_id}/urgent_cases',
            path: {
                'animal_id': animalId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Urgent Case
     * @returns UrgentCaseResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesAddUrgentCase({
        requestBody,
    }: {
        requestBody: UrgentCaseCreate,
    }): CancelablePromise<UrgentCaseResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/animal/urgent_cases',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Urgent Cases
     * @returns UrgentCaseBulkResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesAddUrgentCases({
        requestBody,
    }: {
        requestBody: Array<UrgentCaseCreate>,
    }): CancelablePromise<UrgentCaseBulkResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/animal/urgent_cases/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Urgent Case
     * @returns UrgentCaseResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesUpdateUrgentCase({
        requestBody,
    }: {
        requestBody: UrgentCaseUpdate,
    }): CancelablePromise<UrgentCaseResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/urgent_cases',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Urgent Cases
     * @returns UrgentCaseBulkResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesUpdateUrgentCases({
        requestBody,
    }: {
        requestBody: Array<UrgentCaseUpdate>,
    }): CancelablePromise<UrgentCaseBulkResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/urgent_cases/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Urgent Cases
     * @returns UrgentCaseBulkResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesRemoveUrgentCases({
        requestBody,
    }: {
        requestBody: Array<UrgentCaseId>,
    }): CancelablePromise<UrgentCaseBulkResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/urgent_cases/bulk',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Remove Urgent Case
     * @returns UrgentCaseResponse Successful Response
     * @throws ApiError
     */
    public static urgentCasesRemoveUrgentCase({
        urgentId,
    }: {
        urgentId: number,
    }): CancelablePromise<UrgentCaseResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/urgent_cases/{urgent_id}',
            path: {
                'urgent_id': urgentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
