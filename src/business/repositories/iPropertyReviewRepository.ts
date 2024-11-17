import type { IPropertyReviewEntity, Rating } from "@entities/components/propertyReview/propertyReview";

export type InputCreatePropertyReview = {
	id: string;
	propertyId: string;
	tenantId: string;
	rating: Rating;
	comment: string;
};

export interface IPropertyReviewRepository {
	create(input: InputCreatePropertyReview): Promise<IPropertyReviewEntity>;
}
