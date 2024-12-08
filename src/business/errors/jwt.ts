import type { IError } from "@shared/iError";

export const SignTokenGeneralError = (message?: string): IError => ({
	code: "JWT-001",
	message: message || "Sign Token General Error",
	shortMessage: "signTokenGeneralError",
});

export const TokenExpiredError: IError = {
	code: "JWT-002",
	message: "Token Expired Error",
	shortMessage: "tokenExpiredError",
};

export const VerifyTokenGeneralError = (message?: string): IError => ({
	code: "JWT-003",
	message: message || "Verify Token General Error",
	shortMessage: "verifyTokenGeneralError",
});
