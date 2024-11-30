import { IsNotEmpty, IsUUID } from "class-validator";
import type { OutputCreateShareRequestDto } from "@business/dtos/tenant/shareRequest/createShareRequestDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";

export class InputCreateShareRequestSerializer extends AbstractSerializer<InputCreateShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;

	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCreateShareRequestSerializer = OutputCreateShareRequestDto;
