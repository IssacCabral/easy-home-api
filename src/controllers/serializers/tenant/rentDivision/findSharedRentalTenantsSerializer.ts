import type { OutputFindSharedRentalTenantsDto } from "@business/dtos/tenant/rentDivision/findSharedRentalTenantsDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputFindSharedRentalTenantsSerializer extends AbstractSerializer<InputFindSharedRentalTenantsSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputFindSharedRentalTenantsSerializer = OutputFindSharedRentalTenantsDto;
