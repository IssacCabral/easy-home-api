import type { IError } from "@shared/iError";

type Details = {
	property: string;
	constraints: Record<string, string>;
};

export const validationError = (details?: Details[]): IError => {
	return {
		code: "VAL-001",
		message: "Validation Error",
		shortMessage: "validationError",
		details,
	};
};
