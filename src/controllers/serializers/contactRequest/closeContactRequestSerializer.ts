import type { OutputCloseContactRequestDto } from "@business/dtos/contactRequest/closeContactRequestDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class InputCloseContactRequestSerializer extends AbstractSerializer<InputCloseContactRequestSerializer> {
	@IsNotEmpty()
	@IsUUID()
	id!: string;

	@IsNotEmpty()
	@IsString()
	reason!: string;
}

export type OutputCloseContactRequestSerializer = OutputCloseContactRequestDto;
