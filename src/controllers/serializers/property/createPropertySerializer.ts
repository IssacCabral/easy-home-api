import { AbstractSerializer } from "../abstractSerializer";
import { IsArray, IsEnum, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, ValidateNested } from "class-validator";
import { type BathroomsQuantity, type BedroomsQuantity, PropertyTypes } from "@entities/components/property/property";
import type { OutputCreatePropertyDto } from "@business/dtos/property/createPropertyDto";

class AddressSerializer extends AbstractSerializer<AddressSerializer> {
	@IsNotEmpty()
	@IsNumber()
	number!: number;

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
	bedrooms!: BedroomsQuantity;

	@IsNotEmpty()
	@IsNumber()
	bathrooms!: BathroomsQuantity;

	@IsNotEmpty()
	@IsNumber()
	height!: number;

	@IsNotEmpty()
	@IsNumber()
	width!: number;

	@IsString()
	@IsNotEmpty()
	photosUrl!: string;

	@IsNotEmptyObject()
	@ValidateNested()
	address!: AddressSerializer;

	@IsArray()
	@IsNotEmpty()
	@IsString({ each: true })
	// @arrayMinSize(1)
	amenityIds!: string[];
}

export type OutputCreatePropertySerializer = OutputCreatePropertyDto;
