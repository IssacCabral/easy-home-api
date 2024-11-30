import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import type { OutputSelectShareRequestDto } from "@business/dtos/tenant/shareRequest/selectShareRequestDto";

export class InputSelectShareRequestSerializer extends AbstractSerializer<InputSelectShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	shareRequestId!: string;
}

export type OutputSelectShareRequestSerializer = OutputSelectShareRequestDto;
