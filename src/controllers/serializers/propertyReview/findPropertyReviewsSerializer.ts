import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";
import type { OutputFindPropertyReviewsDto } from "@business/dtos/propertyReview/findPropertyReviewsDto";

export class InputFindPropertyReviewsSerializer extends AbstractSerializer<InputFindPropertyReviewsSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputFindPropertyReviewsSerializer = OutputFindPropertyReviewsDto;
