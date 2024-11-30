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
