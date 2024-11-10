import type { OutputFindPropertyDto } from "@business/dtos/property/findPropertyDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindPropertySerializer extends AbstractSerializer<InputFindPropertySerializer> {
	@IsUUID()
	@IsNotEmpty()
	id!: string;
}

export type OutputFindPropertySerializer = OutputFindPropertyDto;
