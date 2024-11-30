import type { IError } from "@shared/iError";

const CODE_SUFIX = "SHR-B";

export const CreateShareRequestGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Share Request General Error",
	shortMessage: "createShareRequestGeneralError",
};

export const PropertyNotAvailableToShareRequest: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Property Not Available To Share Request",
	shortMessage: "propertyNotAvailableToShareRequest",
};

export const ShareRequestAlreadyExists: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Share Request Already Exists",
	shortMessage: "shareRequestAlreadyExists",
};

export const SelectShareRequestGeneralError: IError = {
	code: `${CODE_SUFIX}-004`,
	message: "Select Share Request General Error",
	shortMessage: "selectShareRequestGeneralError",
};

export const ShareRequestNotFound: IError = {
	code: `${CODE_SUFIX}-005`,
	message: "Share Request Not Found",
	shortMessage: "shareRequestNotFound",
};

export const ShareRequestAlreadySelected: IError = {
	code: `${CODE_SUFIX}-006`,
	message: "Share Request Already Selected",
	shortMessage: "ShareRequestAlreadySelected",
};

export const ShareRequestAlreadyFinished: IError = {
	code: `${CODE_SUFIX}-007`,
	message: "Share Request Already Finished",
	shortMessage: "ShareRequestAlreadyFinished",
};
