import type { OutputFindPropertyRatingDto } from "@business/dtos/propertyReview/findPropertyRatingDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindPropertyRatingSerializer extends AbstractSerializer<InputFindPropertyRatingSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputFindPropertyRatingSerializer = OutputFindPropertyRatingDto;
