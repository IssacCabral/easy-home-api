import type {
	IContactRequestRepository,
	InputCreateContactRequest,
} from "@business/repositories/iContactRequestRepository";
import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PrismaClient } from "@prisma/client";

export class ContactRequestRepository implements IContactRequestRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateContactRequest): Promise<IContactRequestEntity> {
		throw new Error("Method not implemented.");
	}

	async findUnique(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null> {
		throw new Error("Method not implemented.");
	}
}
