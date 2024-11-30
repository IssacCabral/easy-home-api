import type { OutputCompleteRentDivisionDto } from "@business/dtos/tenant/rentDivision/completeRentDivisionDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputCompleteRentDivisionSerializer extends AbstractSerializer<InputCompleteRentDivisionSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCompleteRentDivisionSerializer = OutputCompleteRentDivisionDto;
