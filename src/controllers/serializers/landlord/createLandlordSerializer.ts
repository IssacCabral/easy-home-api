import type { OutputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class InputCreateLandlordSerializer extends AbstractSerializer<InputCreateLandlordSerializer> {
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(65)
	name!: string;

	@IsNotEmpty()
	@IsString()
	number!: string;

	@IsNotEmpty()
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "password is too weak",
	})
	@IsNotEmpty({ message: "password can not be empty" })
	password!: string;
}

export type OutputCreateLandlordSerializer = OutputCreateLandlordDto;
