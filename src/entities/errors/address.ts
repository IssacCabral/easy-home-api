import type { IError } from "@shared/error";

export const InvalidCoordinates: IError = {
	code: "ADR-001",
	message: "Invalid Coordinates",
	shortMessage: "invalidCoordinates",
};

export const InvalidAddressNumber: IError = {
	code: "ADR-002",
	message: "Invalid Address Number",
	shortMessage: "invalidAddressNumber",
};
