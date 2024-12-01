import type { OutputStopTenantRentDivisionDto } from "@business/dtos/tenant/rentDivision/stopTenantRentDivisionDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputStopTenantRentDivisionSerializer extends AbstractSerializer<InputStopTenantRentDivisionSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;

	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;
}

export type OutputStopTenantRentDivisionSerializer = OutputStopTenantRentDivisionDto;
