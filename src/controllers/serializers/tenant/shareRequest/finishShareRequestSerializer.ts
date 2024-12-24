import type { OutputFinishShareRequestDto } from "@business/dtos/tenant/shareRequest/finishShareRequestDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class InputFinishShareRequestSerializer extends AbstractSerializer<InputFinishShareRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	shareRequestId!: string;

	@IsNotEmpty()
	@IsString()
	finalizationReason!: string;
}

export type OutputFinishShareRequestSerializer = OutputFinishShareRequestDto;
