import type { IError } from "@shared/error";

const CODE_SUFIX = "PPT-B";

export const CreatePropertyGeneralError: IError = {
	code: `${CODE_SUFIX}-001`,
	message: "Create Property General Error",
	shortMessage: "createPropertyGeneralError",
};

export const LandlordNotFound: IError = {
	code: `${CODE_SUFIX}-002`,
	message: "Landlord Not Found",
	shortMessage: "landlordNotFound",
};

export const CoordinatesNotAvailable: IError = {
	code: `${CODE_SUFIX}-003`,
	message: "Coordinates Not Available",
	shortMessage: "coordinatesNotAvailable",
};

export const MissingAmenities = (amenitiesNotFound: string): IError => ({
	code: `${CODE_SUFIX}-004`,
	message: `Amenities Not Found: ${amenitiesNotFound}`,
	shortMessage: "missingAmenities",
});
