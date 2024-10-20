import type { OutputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputCreateLandlordSerializer extends AbstractSerializer<InputCreateLandlordSerializer> {
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(65)
	name!: string;

	@IsNotEmpty()
	@IsString()
	@Matches(/^\([1-9]{2}\) 9[0-9]{4}\-[0-9]{4}$/, {
		message: "provide a phone in the format (xx) 9xxxx-xxxx",
	})
	phone!: string;

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
