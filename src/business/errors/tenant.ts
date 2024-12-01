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

export const TenantInAnotherProperty: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "This tenant is part of another property",
	shortMessage: "tenantInAnotherProperty",
};

export const TenantCannotBeMain: IError = {
	code: `${CODE_SUFIX}-004`,
	message: "The given tenant cannot be the main tenant",
	shortMessage: "tenantCannotBeMain",
};

export const TenantNotFoundOnProperty: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Tenant Not Found On Property",
	shortMessage: "tenantNotFoundOnProperty",
};
