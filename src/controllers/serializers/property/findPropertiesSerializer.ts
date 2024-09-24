import type { OutputFindPropertiesDto } from "@business/dtos/property/findPropertiesDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Max, Min, ValidateIf } from "class-validator";
import { PropertyStatus, PropertyTypes } from "@entities/components/property/property";

export class InputFindPropertiesSerializer extends AbstractSerializer<InputFindPropertiesSerializer> {
	@IsNotEmpty()
	@IsInt()
	@IsPositive({
		message: "page must only contain values greater than or equal to 1",
	})
	page!: number;

	@IsNotEmpty()
	@IsInt()
	@IsPositive({
		message: "limit must only contain values greater than or equal to 1",
	})
	limit!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(-90)
	@Max(90)
	centralLat!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(-180)
	@Max(180)
	centralLon!: number;

	@IsNotEmpty()
	@IsNumber()
	@Min(50)
	@Max(2000)
	radiusInMeters!: number;

	@IsNotEmpty()
	@ValidateIf((requestObject) => requestObject.maxPrice !== undefined)
	@IsNumber()
	@Min(1)
	minPrice?: number;

	@IsNotEmpty()
	@ValidateIf((requestObject) => requestObject.minPrice !== undefined)
	@IsNumber()
	@Min(1)
	maxPrice?: number;

	@IsNotEmpty()
	@ValidateIf((requestObject) => requestObject.maxBedrooms !== undefined)
	@IsNumber()
	@Min(1)
	minBedrooms?: number;

	@IsNotEmpty()
	@ValidateIf((requestObject) => requestObject.minBedrooms !== undefined)
	@IsNumber()
	@Min(1)
	maxBedrooms?: number;

	@IsOptional()
	@IsEnum(PropertyStatus)
	status?: PropertyStatus;

	@IsOptional()
	@IsEnum(PropertyTypes)
	type?: PropertyTypes;
}

export type OutputFindPropertiesSerializer = OutputFindPropertiesDto;
