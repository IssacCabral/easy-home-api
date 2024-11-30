import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import type { OutputFinishShareRequestDto } from "@business/dtos/tenant/shareRequest/finishShareRequestDto";

export class InputFinishShareRequestSerializer extends AbstractSerializer<InputFinishShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	shareRequestId!: string;

	@IsNotEmpty()
	@IsString()
	finalizationReason!: string;
}

export type OutputFinishShareRequestSerializer = OutputFinishShareRequestDto;
