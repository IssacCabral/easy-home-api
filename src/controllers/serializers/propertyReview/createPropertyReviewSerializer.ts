import type { OutputCreatePropertyReviewDto } from "@business/dtos/propertyReview/createPropertyReviewDto";
import type { Rating } from "@entities/components/propertyReview/propertyReview";
import { IsIn, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputCreatePropertyReviewSerializer extends AbstractSerializer<InputCreatePropertyReviewSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;

	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;

	@IsNotEmpty()
	@IsIn([1, 2, 3, 4, 5])
	rating!: Rating;

	@IsNotEmpty()
	@IsString()
	comment!: string;
}

export type OutputCreatePropertyReviewSerializer = OutputCreatePropertyReviewDto;
