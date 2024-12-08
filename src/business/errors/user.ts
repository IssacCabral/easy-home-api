import type { IError } from "@shared/iError";

const CODE_SUFIX = "USR-B";

export const EmailNotAvailable: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Email Not Available",
	shortMessage: "email not available",
};

export const GetUserByTokenGeneralError = (message?: string): IError => ({
	code: `${CODE_SUFIX}-002`,
	message: message || "Get User By Token General Error",
	shortMessage: "getUserByTokenGeneralError",
});

export const UserIsNotFoundError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "User Is Not Found Error",
	shortMessage: "userIsNotFoundError",
};
