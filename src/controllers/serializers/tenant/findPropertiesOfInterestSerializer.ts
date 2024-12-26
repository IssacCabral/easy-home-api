import type { OutputFindPropertiesOfInterestDto } from "@business/dtos/tenant/findPropertiesOfInterestDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindPropertiesOfInterestSerializer extends AbstractSerializer<InputFindPropertiesOfInterestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	tenantId!: string;
}

export type OutputFindPropertiesOfInterestSerializer = OutputFindPropertiesOfInterestDto;
