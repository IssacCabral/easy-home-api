import type { IError } from "@shared/iError";

const CODE_SUFIX = "PTR-B";

export const CreatePropertyReviewGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Property Review General Error",
	shortMessage: "createPropertyReviewGeneralError",
};

export const FindPropertyRatingGeneralError: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "FindPropertyRatingGeneralError",
	shortMessage: "findPropertyRatingGeneralError",
};

export const FindPropertyReviewsGeneralError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "FindPropertyReviewsGeneralError",
	shortMessage: "findPropertyReviewsGeneralError",
};
