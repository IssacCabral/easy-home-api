import type { IShareRequestRepository, InputCreateShareRequest } from "@business/repositories/iShareRequestRepository";
import { type IShareRequestEntity, ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";
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

	async select(shareRequestId: string): Promise<IShareRequestEntity> {
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

	async finish(shareRequestId: string): Promise<IShareRequestEntity> {
		const shareRequest = await this.prismaClient.shareRequests.update({
			where: {
				id: shareRequestId,
			},
			data: {
				status: ShareRequestStatus.FINISHED,
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

	async cancelAll(propertyId: string): Promise<void> {
		await this.prismaClient.shareRequests.deleteMany({ where: { propertyId } });
	}

	async cancelTenantOnShareRequests(tenantId: string): Promise<void> {
		await this.prismaClient.shareRequests.deleteMany({ where: { tenantId } });
	}

	async findByStatus(propertyId: string, status: ShareRequestStatus): Promise<IShareRequestEntity[]> {
		const result = await this.prismaClient.shareRequests.findMany({
			where: { propertyId, status },
			include: { property: { include: { address: true, amenities: true } }, tenant: true },
		});

		return result.map((item) => this.mapper(item as IShareRequestEntity));
	}

	async findByTenant(tenantId: string): Promise<IShareRequestEntity[]> {
		const result = await this.prismaClient.shareRequests.findMany({
			where: { tenantId },
			include: { property: { include: { landlord: true } }, tenant: true },
		});

		return result.map((item) => this.mapper(item as IShareRequestEntity));
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
