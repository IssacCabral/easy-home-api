import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { CreateTenantUseCase } from "@business/usecases/tenant/createTenantUseCase";
import { makeTenantRepositoryStub } from "@test/utility/stubs/repositories/tenantRepositoryStub";
import { makeCryptServiceStub } from "@test/utility/stubs/services/cryptServiceStub";
import { makeUniqueIdentifierServiceStub } from "@test/utility/stubs/services/uniqueIdentifierServiceStub";

interface CreateTenantSut {
	sut: CreateTenantUseCase;
	tenantRepositoryStub: ITenantRepository;
	cryptServiceStub: ICryptService;
	uniqueIdentifierServiceStub: IUniqueIdentifierService;
}

export const makeCreateTenantStu = (): CreateTenantSut => {
	const tenantRepositoryStub = makeTenantRepositoryStub();
	const cryptServiceStub = makeCryptServiceStub();
	const uniqueIdentifierServiceStub = makeUniqueIdentifierServiceStub();
	const sut = new CreateTenantUseCase(tenantRepositoryStub, cryptServiceStub, uniqueIdentifierServiceStub);

	return {
		sut,
		tenantRepositoryStub,
		cryptServiceStub,
		uniqueIdentifierServiceStub,
	};
};
