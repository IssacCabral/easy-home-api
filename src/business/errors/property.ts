import type { IError } from "@shared/iError";

const CODE_SUFIX = "PPT-B";

export const CreatePropertyGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Property General Error",
	shortMessage: "createPropertyGeneralError",
};

export const CoordinatesNotAvailable: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Coordinates Not Available",
	shortMessage: "coordinatesNotAvailable",
};

export const FindPropertiesGeneralError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Find Properties General Error",
	shortMessage: "findPropertiesGeneralError",
};
