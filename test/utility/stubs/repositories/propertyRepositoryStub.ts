import type { InputCreateProperty, IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IAddressEntity } from "@entities/components/address/address";
import type { IPropertyEntity } from "@entities/components/property/property";
import { fakeAddressEntity } from "@test/utility/fakes/addressEntity";
import { fakePropertyEntity } from "@test/utility/fakes/propertyEntity";

class PropertyRepositoryStub implements IPropertyRepository {
	async create(input: InputCreateProperty): Promise<IPropertyEntity> {
		return fakePropertyEntity;
	}

	async findAddressByCoordinates(lat: number, lon: number): Promise<IAddressEntity | null> {
		return fakeAddressEntity;
	}
}

export const makePropertyRepositoryStub = (): IPropertyRepository => {
	return new PropertyRepositoryStub();
};
