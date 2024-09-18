import type { IError } from "@shared/iError";

const CODE_SUFIX = "AMT-B";

export const AmenitiesNotFound = (details: string[]): IError => ({
	code: `${CODE_SUFIX}-001`,
	message: "Some Amenities Were Not Found",
	shortMessage: "amenitiesNotFound",
	details,
});