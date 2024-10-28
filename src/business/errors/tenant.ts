import type { IError } from "@shared/iError";

const CODE_SUFIX = "TEN-B";

export const CreateTenantGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Tenant General Error",
	shortMessage: "createTenantGeneralError",
};

export const TenantNotFound: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Tenant Not Found",
	shortMessage: "tenantNotFound",
};
