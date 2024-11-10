import type {
	IContactRequestRepository,
	InputCreateContactRequest,
} from "@business/repositories/iContactRequestRepository";
import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PrismaClient } from "@prisma/client";

export class ContactRequestRepository implements IContactRequestRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateContactRequest): Promise<IContactRequestEntity> {
		const newContactRequest = await this.prismaClient.contactRequests.create({
			data: {
				propertyId: input.propertyId,
				tenantId: input.tenantId,
				status: input.status,
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return this.mapper(newContactRequest as IContactRequestEntity);
	}

	async findUnique(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null> {
		const contactRequest = await this.prismaClient.contactRequests.findUnique({
			where: { tenantId_propertyId: { tenantId, propertyId } },
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return contactRequest ? this.mapper(contactRequest as IContactRequestEntity) : null;
	}

	private mapper(contactRequest: IContactRequestEntity): IContactRequestEntity {
		return {
			tenant: contactRequest.tenant,
			property: contactRequest.property,
			status: contactRequest.status,
			requestDate: contactRequest.requestDate,
		};
	}
}
