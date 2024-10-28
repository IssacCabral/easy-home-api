import type { IError } from "@shared/iError";

const CODE_SUFIX = "USR-B";

export const EmailNotAvailable: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Email Not Available",
	shortMessage: "email not available",
};
