import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";
import type { OutputFindPropertyRatingDto } from "@business/dtos/propertyReview/findPropertyRatingDto";

export class InputFindPropertyRatingSerializer extends AbstractSerializer<InputFindPropertyRatingSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputFindPropertyRatingSerializer = OutputFindPropertyRatingDto;
