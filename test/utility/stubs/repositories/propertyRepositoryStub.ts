import type {
	InputCreateProperty,
	InputFindAddress,
	InputFindLandlordProperties,
	InputFindManyProperties,
	InputSaveTenantOnProperty,
	IPropertyRepository,
	OutputFindLandlordProperties,
	OutputFindManyProperties,
} from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity } from "@entities/components/property/property";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";

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
}

export const makePropertyRepositoryStub = (): IPropertyRepository => {
	return new PropertyRepositoryStub();
};
