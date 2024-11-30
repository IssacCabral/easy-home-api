import type { InputCreateShareRequest, IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import { ShareRequestStatus, type PrismaClient } from "@prisma/client";

export class ShareRequestRepository implements IShareRequestRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreateShareRequest): Promise<IShareRequestEntity> {
		const newShareRequest = await this.prismaClient.shareRequests.create({
			data: {
				id: input.id,
				propertyId: input.propertyId,
				tenantId: input.tenantId,
				status: input.status,
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return this.mapper(newShareRequest as IShareRequestEntity);
	}

	async findInContact(tenantId: string, propertyId: string): Promise<IShareRequestEntity | null> {
		const shareRequest = await this.prismaClient.shareRequests.findFirst({
			where: {
				tenantId,
				propertyId,
				AND: {
					status: ShareRequestStatus.IN_CONTACT,
				},
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return shareRequest ? this.mapper(shareRequest as IShareRequestEntity) : null;
	}

	private mapper(shareRequest: IShareRequestEntity): IShareRequestEntity {
		return {
			id: shareRequest.id,
			tenant: shareRequest.tenant,
			property: shareRequest.property,
			status: shareRequest.status,
			finalizationReason: shareRequest.finalizationReason,
			requestDate: shareRequest.requestDate,
		};
	}
}
