import type { IError } from "@shared/iError";

const CODE_SUFIX = "LGN-B";

export const LoginGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Login General Error",
	shortMessage: "loginGeneralError",
};

export const InvalidCredentialsError: IError = {
	code: "AUTH-002",
	message: "Invalid Credentials Error",
	shortMessage: "invalidCredentialsError",
};
