/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UrgentCaseResponse } from './UrgentCaseResponse';
import type { UrgentCaseUpdateFailed } from './UrgentCaseUpdateFailed';
export type UrgentCaseBulkResponse = {
    success: (Array<UrgentCaseResponse> | null);
    failed: (Array<UrgentCaseUpdateFailed> | null);
};

