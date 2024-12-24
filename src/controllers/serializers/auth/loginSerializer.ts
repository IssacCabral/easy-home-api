import type { OutputLoginDto } from "@business/dtos/auth/loginDto";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputLoginSerializer extends AbstractSerializer<InputLoginSerializer> {
	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}

export type OutputLoginSerializer = OutputLoginDto;
