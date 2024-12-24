import type { OutputRentPropertyDto } from "@business/dtos/contactRequest/rentPropertyDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputRentPropertySerializer extends AbstractSerializer<InputRentPropertySerializer> {
	@IsNotEmpty()
	@IsUUID()
	contactRequestId!: string;
}

export type OutputRentPropertySerializer = OutputRentPropertyDto;
