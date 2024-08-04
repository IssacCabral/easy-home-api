import type { IError } from "@shared/error";

const CODE_SUFIX = "ADR-E";

export const InvalidCoordinates: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Invalid Coordinates",
	shortMessage: "invalidCoordinates",
};

export const InvalidAddressNumber: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Invalid Address Number",
	shortMessage: "invalidAddressNumber",
};
