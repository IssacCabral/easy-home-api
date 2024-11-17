import type { IError } from "@shared/iError";

const CODE_SUFIX = "LAN-B";

export const CreateLandlordGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Landlord General Error",
	shortMessage: "createLandlordGeneralError",
};

export const LandlordNotFound: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Landlord Not Found",
	shortMessage: "landlordNotFound",
};

export const GetDashboardSummaryGeneralError: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Get Dashboard Summary General Error",
	shortMessage: "getDashboardSummaryGeneralError",
};
