import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { CreateLandlordUseCase } from "@business/usecases/landlord/createLandlordUseCase";
import { makeLandLordRepositoryStub } from "@test/utility/stubs/repositories/landlordRepositoryStub";
import { makeTenantRepositoryStub } from "@test/utility/stubs/repositories/tenantRepositoryStub";
import { makeCryptServiceStub } from "@test/utility/stubs/services/cryptServiceStub";
import { makeUniqueIdentifierServiceStub } from "@test/utility/stubs/services/uniqueIdentifierServiceStub";

interface CreateLandlordSut {
	sut: CreateLandlordUseCase;
	landlordRepositoryStub: ILandlordRepository;
	tenantRepositoryStub: ITenantRepository;
	cryptServiceStub: ICryptService;
	uniqueIdentifierServiceStub: IUniqueIdentifierService;
}

export const makeCreateLandlordSut = (): CreateLandlordSut => {
	const landlordRepositoryStub = makeLandLordRepositoryStub();
	const tenantRepositoryStub = makeTenantRepositoryStub();
	const cryptServiceStub = makeCryptServiceStub();
	const uniqueIdentifierServiceStub = makeUniqueIdentifierServiceStub();
	const sut = new CreateLandlordUseCase(
		landlordRepositoryStub,
		tenantRepositoryStub,
		cryptServiceStub,
		uniqueIdentifierServiceStub,
	);

	return {
		sut,
		cryptServiceStub,
		landlordRepositoryStub,
		tenantRepositoryStub,
		uniqueIdentifierServiceStub,
	};
};
