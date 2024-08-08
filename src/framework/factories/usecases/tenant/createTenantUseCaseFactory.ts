import { CreateTenantUseCase } from "@business/usecases/tenant/createTenantUseCase";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { CryptService } from "@framework/services/cryptService";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";
import { PrismaClient } from "@prisma/client";

export const makeCreateTenantUseCase = (): CreateTenantUseCase => {
	const prismaClient = new PrismaClient();
	const tenantRepository = new TenantRepository(prismaClient);
	const cryptService = new CryptService();
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateTenantUseCase(tenantRepository, cryptService, uniqueIdentifierService);
};
