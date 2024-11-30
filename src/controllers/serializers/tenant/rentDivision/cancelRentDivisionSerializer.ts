import type { OutputCancelRentDivisionDto } from "@business/dtos/tenant/rentDivision/cancelRentDivisionDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputCancelRentDivisionSerializer extends AbstractSerializer<InputCancelRentDivisionSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCancelRentDivisionSerializer = OutputCancelRentDivisionDto;
