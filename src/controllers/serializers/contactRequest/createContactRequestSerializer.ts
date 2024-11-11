import type { OutputCreateContactRequestDto } from "@business/dtos/contactRequest/createContactRequestDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputCreateContactRequestSerializer extends AbstractSerializer<InputCreateContactRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;

	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCreateContactRequestSerializer = OutputCreateContactRequestDto;
