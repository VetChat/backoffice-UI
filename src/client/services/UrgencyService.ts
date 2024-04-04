/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UrgencyMostRequest } from '../models/UrgencyMostRequest';
import type { UrgencyResponse } from '../models/UrgencyResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UrgencyService {
    /**
     * Get Most Urgent Case
     * @returns UrgencyResponse Successful Response
     * @throws ApiError
     */
    public static urgencyGetMostUrgentCase({
        requestBody,
    }: {
        requestBody: Array<UrgencyMostRequest>,
    }): CancelablePromise<UrgencyResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/urgency/most_urgent',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
