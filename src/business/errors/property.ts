import type { IError } from "@shared/iError";

const CODE_SUFIX = "PPT-B";

export const CreatePropertyGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Property General Error",
	shortMessage: "createPropertyGeneralError",
};

export const AddressNotAvailable: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Address Not Available",
	shortMessage: "AddressNotAvailable",
};

export const FindPropertiesGeneralError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Find Properties General Error",
	shortMessage: "findPropertiesGeneralError",
};

export const PropertyNotFound: IError = {
	code: `${CODE_SUFIX}-004`,
	message: "Property Not Found",
	shortMessage: "propertyNotFound",
};

export const FindPropertyGeneralError: IError = {
	code: `${CODE_SUFIX}-005`,
	message: "Find Property General Error",
	shortMessage: "findPropertyGeneralError",
};
