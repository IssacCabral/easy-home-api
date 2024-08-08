import type { IError } from "@shared/iError";

const CODE_SUFIX = "TEN-B";

export const TenantAlreadyExists: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Tenant Already Exists",
	shortMessage: "tenantAlreadyExists",
};

export const CreateTenantGeneralError: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Create Tenant General Error",
	shortMessage: "createTenantGeneralError",
};

export const TenantNotFound: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Tenant Not Found",
	shortMessage: "tenantNotFound",
};
