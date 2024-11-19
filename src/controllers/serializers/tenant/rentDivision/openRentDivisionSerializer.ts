import type { OutputOpenRentDivisionDto } from "@business/dtos/tenant/rentDivision/openRentDivisionDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputOpenRentDivisionSerializer extends AbstractSerializer<InputOpenRentDivisionSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputOpenRentDivisionSerializer = OutputOpenRentDivisionDto;
