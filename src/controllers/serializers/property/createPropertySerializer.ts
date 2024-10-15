import type { OutputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";
import type { IAddressEntity } from "@entities/components/address/address";
import { PropertyTypes } from "@entities/components/property/property";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";
import { ValidateNestedObject } from "../validateNestedObject";

class AddressSerializer extends AbstractSerializer<AddressSerializer> {
	@IsNotEmpty()
	@IsNumber()
	addressNumber!: number;

	@IsNotEmpty()
	@IsString()
	street!: string;

	@IsNotEmpty()
	@IsNumber()
	lat!: number;

	@IsNotEmpty()
	@IsNumber()
	lon!: number;
}

export class InputCreatePropertySerializer extends AbstractSerializer<InputCreatePropertySerializer> {
	@IsString()
	@IsNotEmpty()
	landlordId!: string;

	@IsString()
	@IsNotEmpty()
	title!: string;

	@IsNotEmpty()
	@IsEnum(PropertyTypes)
	type!: PropertyTypes;

	@IsNotEmpty()
	@IsNotEmpty()
	description!: string;

	@IsNotEmpty()
	@IsNumber({ maxDecimalPlaces: 2 })
	price!: number;

	@IsNotEmpty()
	@IsNumber()
	bedrooms!: number;

	@IsNotEmpty()
	@IsNumber()
	bathrooms!: number;

	@IsNotEmpty()
	@IsNumber()
	depth!: number;

	@IsNotEmpty()
	@IsNumber()
	width!: number;

	@IsNotEmptyObject()
	@ValidateNestedObject(AddressSerializer)
	address!: Omit<IAddressEntity, "id" | "createdAt" | "updatedAt">;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	@ArrayNotEmpty()
	amenityIds!: string[];
}

export type OutputCreatePropertySerializer = OutputCreatePropertyDto;
