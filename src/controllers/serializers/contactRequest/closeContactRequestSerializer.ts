import type { OutputCloseContactRequestDto } from "@business/dtos/contactRequest/closeContactRequestDto";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputCloseContactRequestSerializer extends AbstractSerializer<InputCloseContactRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	id!: string;

	@IsOptional()
	@IsString()
	reason?: string;
}

export type OutputCloseContactRequestSerializer = OutputCloseContactRequestDto;
