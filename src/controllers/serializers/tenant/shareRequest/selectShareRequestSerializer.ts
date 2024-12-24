import type { OutputSelectShareRequestDto } from "@business/dtos/tenant/shareRequest/selectShareRequestDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputSelectShareRequestSerializer extends AbstractSerializer<InputSelectShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	shareRequestId!: string;
}

export type OutputSelectShareRequestSerializer = OutputSelectShareRequestDto;
