import type { IError } from "@shared/iError";

const CODE_SUFIX = "RNT-B";

export const OpenRentDivisionGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Open Rent Division General Error",
	shortMessage: "openRentDivisionGeneralError",
};

export const PropertyNotAvailableToRentDivision: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Property Not Available To Rent Division",
	shortMessage: "propertyNotAvailableToRentDivision",
};

export const CancelRentDivisionGeneralError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Cancel Rent Division General Error",
	shortMessage: "cancelRentDivisionGeneralError",
};

export const CompleteRentDivisionGeneralError: IError = {
	code: `${CODE_SUFIX}-004`,
	message: "Complete Rent Division General Error",
	shortMessage: "completeRentDivisionGeneralError",
};

export const FindSharedRentalTenantsGeneralError: IError = {
	code: `${CODE_SUFIX}-005`,
	message: "Find Shared Rental Tenants General Error",
	shortMessage: "findSharedRentalTenantsGeneralError",
};
