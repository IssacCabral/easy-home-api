import type { OutputFindPropertiesDto } from "@business/dtos/property/findPropertiesDto";
import { AbstractSerializer } from "../abstractSerializer";
import { IsInt, IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator";

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
}

export type OutputFindPropertiesSerializer = OutputFindPropertiesDto;
