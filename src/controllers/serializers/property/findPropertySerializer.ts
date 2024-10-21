import type { OutputFindPropertyDto } from "@business/dtos/property/findPropertyDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputFindPropertySerializer extends AbstractSerializer<InputFindPropertySerializer> {
	@IsUUID()
	@IsNotEmpty()
	id!: string;
}

export type OutputFindPropertySerializer = OutputFindPropertyDto;
