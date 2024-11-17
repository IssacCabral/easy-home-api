import type {
	IContactRequestRepository,
	InputCloseContactRequest,
	InputCreateContactRequest,
	InputFindLandlordContactRequests,
	OutputFindLandlordContactRequests,
} from "@business/repositories/iContactRequestRepository";
import { ContactRequestStatus, type IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { PrismaClient } from "@prisma/client";

export class ContactRequestRepository implements IContactRequestRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateContactRequest): Promise<IContactRequestEntity> {
		const newContactRequest = await this.prismaClient.contactRequests.create({
			data: {
				id: input.id,
				propertyId: input.propertyId,
				tenantId: input.tenantId,
				status: input.status,
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return this.mapper(newContactRequest as IContactRequestEntity);
	}

	async findInContact(tenantId: string, propertyId: string): Promise<IContactRequestEntity | null> {
		const contactRequest = await this.prismaClient.contactRequests.findFirst({
			where: {
				tenantId,
				propertyId,
				AND: {
					status: ContactRequestStatus.IN_CONTACT,
				},
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return contactRequest ? this.mapper(contactRequest as IContactRequestEntity) : null;
	}

	async findLandlordContactRequests(
		input: InputFindLandlordContactRequests,
	): Promise<OutputFindLandlordContactRequests> {
		const landlordContactRequests = await this.prismaClient.contactRequests.findMany({
			where: {
				property: {
					landlordId: input.landlordId,
					title: input.title ? { contains: input.title, mode: "insensitive" } : undefined,
				},
				tenant: input.tenantName ? { name: { contains: input.tenantName, mode: "insensitive" } } : undefined,
				status: input.status || undefined,
			},
			include: {
				tenant: true,
				property: {
					include: {
						address: true,
					},
				},
			},
			take: input.limit,
			skip: (input.page - 1) * input.limit,
		});

		const total = await this.prismaClient.contactRequests.count({
			where: {
				property: {
					landlordId: input.landlordId,
					title: input.title ? { contains: input.title, mode: "insensitive" } : undefined,
				},
				tenant: input.tenantName ? { name: { contains: input.tenantName, mode: "insensitive" } } : undefined,
				status: input.status || undefined,
			},
		});

		return {
			meta: {
				page: input.page,
				limit: input.limit,
				total,
				hasNext: input.page * input.limit < total,
			},
			data: landlordContactRequests.map((contactRequest) => this.mapper(contactRequest as IContactRequestEntity)),
		};
	}

	async findById(id: string): Promise<IContactRequestEntity | null> {
		const contactRequest = await this.prismaClient.contactRequests.findUnique({
			where: { id },
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return contactRequest ? this.mapper(contactRequest as IContactRequestEntity) : null;
	}

	async rentProperty(contactRequestId: string): Promise<IContactRequestEntity> {
		const contactRequestRented = await this.prismaClient.contactRequests.update({
			where: {
				id: contactRequestId,
			},
			data: {
				status: ContactRequestStatus.RENTED,
			},
			include: { tenant: true, property: { include: { address: true } } },
		});

		return this.mapper(contactRequestRented as IContactRequestEntity);
	}

	async finalizePendingContactRequests(tenantId: string, propertyId: string): Promise<void> {
		await this.prismaClient.contactRequests.updateMany({
			where: {
				propertyId: propertyId,
				tenantId: { not: tenantId },
				status: ContactRequestStatus.IN_CONTACT,
			},
			data: {
				status: ContactRequestStatus.FINISHED,
				finalizationReason: "Contact Request Closed By Landlord",
			},
		});

		await this.prismaClient.contactRequests.updateMany({
			where: {
				propertyId: { not: propertyId },
				tenantId: tenantId,
				status: ContactRequestStatus.IN_CONTACT,
			},
			data: {
				status: ContactRequestStatus.FINISHED,
				finalizationReason: "You signed a contract on another property",
			},
		});
	}

	async close(input: InputCloseContactRequest): Promise<IContactRequestEntity> {
		const contactRequest = await this.prismaClient.contactRequests.update({
			where: {
				id: input.id,
			},
			data: {
				status: ContactRequestStatus.FINISHED,
				finalizationReason: input.reason,
			},
			include: { tenant: true, property: { include: { address: true } } },
		});

		return this.mapper(contactRequest as IContactRequestEntity);
	}

	private mapper(contactRequest: IContactRequestEntity): IContactRequestEntity {
		return {
			id: contactRequest.id,
			tenant: contactRequest.tenant,
			property: contactRequest.property,
			status: contactRequest.status,
			finalizationReason: contactRequest.finalizationReason,
			requestDate: contactRequest.requestDate,
		};
	}
}
