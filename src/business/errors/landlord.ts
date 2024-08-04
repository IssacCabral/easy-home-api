import type { IError } from "@shared/error";

const CODE_SUFIX = "LAN-B";

export const LandlordAlreadyExists: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Landlord Already Exists",
	shortMessage: "landlordAlreadyExists",
};

export const CreateLandlordGeneralError: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Create Landlord General Error",
	shortMessage: "createLandlordGeneralError",
};
