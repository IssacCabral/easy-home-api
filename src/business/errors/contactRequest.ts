import type { IError } from "@shared/iError";

const CODE_SUFIX = "CTR-B";

export const CreateContactRequestGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Contact Request General Error",
	shortMessage: "createContactRequestGeneralError",
};

export const ContactRequestAlreadyExists: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Contact Request Already Exists",
	shortMessage: "contactRequestAlreadyExists",
};
