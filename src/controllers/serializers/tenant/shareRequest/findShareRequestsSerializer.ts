import type { OutputFindShareRequestsDto } from "@business/dtos/tenant/shareRequest/findShareRequestsDto";
import { AbstractSerializer } from "@controllers/serializers/abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputFindShareRequestsSerializer extends AbstractSerializer<InputFindShareRequestsSerializer> {
	@IsNotEmpty()
	@IsUUID()
	propertyId!: string;
}

export type OutputFindShareRequestsSerializer = OutputFindShareRequestsDto;
