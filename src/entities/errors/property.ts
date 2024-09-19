import type { IError } from "@shared/iError";

const CODE_SUFIX = "PPT-E";

export const InvalidBathroomsQuantity: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Invalid Bathrooms Quantity",
	shortMessage: "invalidBathroomsQuantity",
};

export const InvalidBedroomsQuantity: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Invalid Bedrooms Quantity",
	shortMessage: "invalidBedroomsQuantity",
};

export const InvalidWidth: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Invalid Width",
	shortMessage: "invalidWidth",
};

export const InvalidDepth: IError = {
	code: `${CODE_SUFIX}-004`,
	message: "Invalid Depth",
	shortMessage: "invalidDepth",
};
