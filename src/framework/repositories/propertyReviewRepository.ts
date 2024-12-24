import type {
	IPropertyReviewRepository,
	InputCreatePropertyReview,
} from "@business/repositories/iPropertyReviewRepository";
import type { IPropertyReviewEntity } from "@entities/components/propertyReview/propertyReview";
import type { PrismaClient } from "@prisma/client";

export class PropertyReviewRepository implements IPropertyReviewRepository {
	constructor(private readonly prismaClient: PrismaClient) {}

	async create(input: InputCreatePropertyReview): Promise<IPropertyReviewEntity> {
		const propertyReview = await this.prismaClient.propertyReviews.create({
			data: {
				id: input.id,
				rating: input.rating,
				comment: input.comment,
				propertyId: input.propertyId,
				tenantId: input.tenantId,
			},
			include: { property: { include: { address: true } }, tenant: true },
		});

		return this.mapper(propertyReview as IPropertyReviewEntity);
	}

	async findRating(propertyId: string): Promise<number> {
		const rating = await this.prismaClient.propertyReviews.aggregate({
			where: { propertyId },
			_avg: {
				rating: true,
			},
		});

		return Math.round(rating._avg.rating ?? 0);
	}

	async findMany(propertyId: string): Promise<IPropertyReviewEntity[]> {
		const result = await this.prismaClient.propertyReviews.findMany({
			where: { propertyId },
			include: { property: { include: { address: true } }, tenant: true },
		});

		return result.map((review) => this.mapper(review as IPropertyReviewEntity));
	}

	private mapper(propertyReview: IPropertyReviewEntity): IPropertyReviewEntity {
		return {
			id: propertyReview.id,
			rating: propertyReview.rating,
			comment: propertyReview.comment,
			property: propertyReview.property,
			tenant: propertyReview.tenant,
			createdAt: propertyReview.createdAt,
		};
	}
}
