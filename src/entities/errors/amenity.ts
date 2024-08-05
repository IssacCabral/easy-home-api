import type { IError } from "@shared/iError";

const CODE_SUFIX = "AMT-E";

export const InvalidLabel: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "The Label Must Consist Of Just One Word",
	shortMessage: "theLabelMustConsistOfJustOneWord",
};
