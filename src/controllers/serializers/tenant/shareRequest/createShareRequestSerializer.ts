import type { OutputCreateShareRequestDto } from "@business/dtos/tenant/shareRequest/createShareRequestDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputCreateShareRequestSerializer extends AbstractSerializer<InputCreateShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;

	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputCreateShareRequestSerializer = OutputCreateShareRequestDto;
