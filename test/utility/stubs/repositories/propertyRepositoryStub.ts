import type {
	InputCreateProperty,
	InputFindAddress,
	InputFindLandlordProperties,
	InputFindManyProperties,
	InputSaveTenantOnProperty,
	InputUpdateProperty,
	IPropertyRepository,
	OutputFindLandlordProperties,
	OutputFindManyProperties,
} from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity, PropertyStatus } from "@entities/components/property/property";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";
import { fakeTenantEntity } from "@test/utility/fakes/tenantEntity";

class PropertyRepositoryStub implements IPropertyRepository {
	async create(input: InputCreateProperty): Promise<IPropertyEntity> {
		return fakePropertyEntity;
	}

	async findAddress(input: InputFindAddress): Promise<IAddressEntity | null> {
		return null;
	}

	async findMany(input: InputFindManyProperties): Promise<OutputFindManyProperties> {
		return {
			meta: {
				hasNext: false,
				limit: 10,
				page: 2,
				total: 3,
			},
			data: [fakePropertyEntity, fakePropertyEntity, fakePropertyEntity],
		};
	}

	async findById(id: string): Promise<IPropertyEntity | null> {
		return fakePropertyEntity;
	}

	async findLandlordProperties(input: InputFindLandlordProperties): Promise<OutputFindLandlordProperties> {
		return {
			meta: {
				hasNext: false,
				limit: 10,
				page: 2,
				total: 3,
			},
			data: [fakePropertyEntity, fakePropertyEntity, fakePropertyEntity],
		};
	}

	async saveTenantOnProperty(input: InputSaveTenantOnProperty): Promise<void> {
		return Promise.resolve();
	}

	async findTenantOnProperty(tenantId: string): Promise<ITenantEntity | null> {
		return fakeTenantEntity;
	}

	async update(input: InputUpdateProperty): Promise<IPropertyEntity> {
		return fakePropertyEntity;
	}

	async updateStatus(propertyId: string, status: PropertyStatus): Promise<IPropertyEntity> {
		return fakePropertyEntity;
	}
}

export const makePropertyRepositoryStub = (): IPropertyRepository => {
	return new PropertyRepositoryStub();
};
