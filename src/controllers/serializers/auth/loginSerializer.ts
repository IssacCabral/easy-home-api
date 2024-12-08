import type { OutputLoginDto } from "@business/dtos/auth/loginDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class InputLoginSerializer extends AbstractSerializer<InputLoginSerializer> {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}

export type OutputLoginSerializer = OutputLoginDto;
