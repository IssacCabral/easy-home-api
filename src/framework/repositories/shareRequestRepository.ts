import type { InputCreateShareRequest, IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import { ShareRequestStatus, type IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import type { PrismaClient } from "@prisma/client";

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

	async findFirst(tenantId: string, propertyId: string): Promise<IShareRequestEntity | null> {
		const shareRequest = await this.prismaClient.shareRequests.findFirst({
			where: {
				tenantId,
				propertyId,
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return shareRequest ? this.mapper(shareRequest as IShareRequestEntity) : null;
	}

	async selectTenant(shareRequestId: string): Promise<IShareRequestEntity> {
		const shareRequest = await this.prismaClient.shareRequests.update({
			where: {
				id: shareRequestId,
			},
			data: {
				status: ShareRequestStatus.SELECTED,
			},
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return this.mapper(shareRequest as IShareRequestEntity);
	}

	async findById(id: string): Promise<IShareRequestEntity | null> {
		const shareRequest = await this.prismaClient.shareRequests.findUnique({
			where: { id },
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
