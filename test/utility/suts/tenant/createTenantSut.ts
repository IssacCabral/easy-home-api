import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { CreateTenantUseCase } from "@business/usecases/tenant/createTenantUseCase";
import { makeLandLordRepositoryStub } from "@test/utility/stubs/repositories/landlordRepositoryStub";
import { makeTenantRepositoryStub } from "@test/utility/stubs/repositories/tenantRepositoryStub";
import { makeCryptServiceStub } from "@test/utility/stubs/services/cryptServiceStub";
import { makeUniqueIdentifierServiceStub } from "@test/utility/stubs/services/uniqueIdentifierServiceStub";

interface CreateTenantSut {
	sut: CreateTenantUseCase;
	tenantRepositoryStub: ITenantRepository;
	landlordRepositoryStub: ILandlordRepository;
	cryptServiceStub: ICryptService;
	uniqueIdentifierServiceStub: IUniqueIdentifierService;
}

export const makeCreateTenantSut = (): CreateTenantSut => {
	const tenantRepositoryStub = makeTenantRepositoryStub();
	const landlordRepositoryStub = makeLandLordRepositoryStub();
	const cryptServiceStub = makeCryptServiceStub();
	const uniqueIdentifierServiceStub = makeUniqueIdentifierServiceStub();
	const sut = new CreateTenantUseCase(
		tenantRepositoryStub,
		landlordRepositoryStub,
		cryptServiceStub,
		uniqueIdentifierServiceStub,
	);

	return {
		sut,
		tenantRepositoryStub,
		landlordRepositoryStub,
		cryptServiceStub,
		uniqueIdentifierServiceStub,
	};
};
