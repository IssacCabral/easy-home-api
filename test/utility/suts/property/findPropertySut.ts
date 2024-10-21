import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import { FindPropertyUseCase } from "@business/usecases/property/findPropertyUseCase";
import { makePropertyRepositoryStub } from "@test/utility/stubs/repositories/propertyRepositoryStub";

interface FindPropertySut {
	sut: FindPropertyUseCase;
	propertyRepository: IPropertyRepository;
}

export const makeFindPropertySut = (): FindPropertySut => {
	const propertyRepository = makePropertyRepositoryStub();
	const sut = new FindPropertyUseCase(propertyRepository);

	return {
		sut,
		propertyRepository,
	};
};
