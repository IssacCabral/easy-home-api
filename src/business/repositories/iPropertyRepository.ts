import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity, PropertyStatus, PropertyTypes } from "@entities/components/property/property";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import type { PaginationData, PaginationParams } from "@entities/shared/pagination";

export type InputCreateProperty = {
	id: string;
	landlordId: string;
	description: string;
	title: string;
	type: PropertyTypes;
	price: number;
	status: PropertyStatus;
	bedrooms: number;
	bathrooms: number;
	depth: number;
	width: number;
	photosUrl: string;
	amenityIds: string[];
	address: IAddressEntity;
};

export type InputFindAddress = {
	lat: number;
	lon: number;
	street: string;
	addressNumber: number;
};

export type InputFindManyProperties = {
	centralLat: number;
	centralLon: number;
	radiusInMeters: number;
	minPrice?: number;
	maxPrice?: number;
	minBedrooms?: number;
	maxBedrooms?: number;
	status?: PropertyStatus;
	type?: PropertyTypes;
	amenities?: string[];
} & PaginationParams;

export type OutputFindManyProperties = PaginationData<IPropertyEntity>;

export type InputFindLandlordProperties = {
	landlordId: string;
	title?: string;
	tenantName?: string;
	status?: PropertyStatus;
} & PaginationParams;

export type OutputFindLandlordProperties = PaginationData<IPropertyEntity>;

export type InputSaveTenantOnProperty = {
	tenantId: string;
	propertyId: string;
	isMainTenant: boolean;
};

export type InputUpdateProperty = Partial<
	Pick<IPropertyEntity, "bathrooms" | "bedrooms" | "depth" | "price" | "description" | "title" | "width" | "type">
>;

export type OutputFindTenantOnProperty = {
	tenant: ITenantEntity;
	property: IPropertyEntity;
	isMainTenant: boolean;
};

export interface IPropertyRepository {
	create(input: InputCreateProperty): Promise<IPropertyEntity>;
	findAddress(input: InputFindAddress): Promise<IAddressEntity | null>;
	findMany(input: InputFindManyProperties): Promise<OutputFindManyProperties>;
	findById(id: string): Promise<IPropertyEntity | null>;
	findLandlordProperties(input: InputFindLandlordProperties): Promise<OutputFindLandlordProperties>;
	saveTenantOnProperty(input: InputSaveTenantOnProperty): Promise<void>;
	findTenantOnProperty(tenantId: string): Promise<OutputFindTenantOnProperty | null>;
	findTenantsOnProperty(propertyId: string): Promise<ITenantEntity[]>;
	removeTenantOnProperty(tenantId: string): Promise<void>;
	update(input: InputUpdateProperty): Promise<IPropertyEntity>;
	updateStatus(propertyId: string, status: PropertyStatus): Promise<IPropertyEntity>;
}
