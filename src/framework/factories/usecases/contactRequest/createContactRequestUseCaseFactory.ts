import { CreateContactRequestUseCase } from "@business/usecases/contactRequest/createContactRequestUseCase";
import { prismaClient } from "@framework/database/prisma/prismaClient";
import { ContactRequestRepository } from "@framework/repositories/contactRequestRepository";
import { PropertyRepository } from "@framework/repositories/propertyRepository";
import { TenantRepository } from "@framework/repositories/tenantRepository";
import { UniqueIdentifierService } from "@framework/services/uniqueIdentifierService";

export const makeCreateContactRequestUseCase = (): CreateContactRequestUseCase => {
	const contactRequestRepository = new ContactRequestRepository(prismaClient);
	const propertyRepository = new PropertyRepository(prismaClient);
	const tenantRepository = new TenantRepository(prismaClient);
	const uniqueIdentifierService = new UniqueIdentifierService();

	return new CreateContactRequestUseCase(
		contactRequestRepository,
		propertyRepository,
		tenantRepository,
		uniqueIdentifierService,
	);
};
