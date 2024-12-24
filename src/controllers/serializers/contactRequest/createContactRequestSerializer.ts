import type { OutputCreateContactRequestDto } from "@business/dtos/contactRequest/createContactRequestDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputCreateContactRequestSerializer extends AbstractSerializer<InputCreateContactRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;

	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCreateContactRequestSerializer = OutputCreateContactRequestDto;
