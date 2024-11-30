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
