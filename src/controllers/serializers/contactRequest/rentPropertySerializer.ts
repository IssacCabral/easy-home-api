import type { OutputRentPropertyDto } from "@business/dtos/contactRequest/rentPropertyDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsNotEmpty, IsUUID } from "class-validator";

export class InputRentPropertySerializer extends AbstractSerializer<InputRentPropertySerializer> {
	@IsNotEmpty()
	@IsUUID()
	contactRequestId!: string;
}

export type OutputRentPropertySerializer = OutputRentPropertyDto;
