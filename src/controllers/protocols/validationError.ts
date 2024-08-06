import type { IError } from "@shared/iError";

export const validationError = (details?: any): IError => {
	return {
		code: "VAL-001",
		message: "Validation Error",
		shortMessage: "validationError",
		details,
	};
};
