import type { IAddressEntity } from "@entities/components/address/address";
import type { IAmenityEntity } from "@entities/components/amenity/amenity";
import type { IPropertyEntity } from "@entities/components/property/property";
import type { Either } from "@shared/either";
import type { IError } from "@shared/iError";

export type InputFindPropertiesOfInterestDto = { tenantId: string };

type Property = Omit<IPropertyEntity, "address" | "amenities"> & {
	address?: IAddressEntity;
	amenities?: IAmenityEntity[];
};

export enum PropertiesOfInterestStatus {
	IN_CONTACT = "IN_CONTACT",
	RENTED = "RENTED",
	FINISHED = "FINISHED",
	SELECTED = "SELECTED",
}

export type PropertiesOfInterest = {
	id: string;
	property: Property;
	type: "shared" | "individual";
	status: PropertiesOfInterestStatus;
	finalizationReason?: string;
	requestDate: Date;
};

export type OutputFindPropertiesOfInterestDto = Either<IError, PropertiesOfInterest[]>;
