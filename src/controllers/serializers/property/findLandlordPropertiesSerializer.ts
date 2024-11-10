import type { OutputFindLandlordPropertiesDto } from "@business/dtos/property/findLandlordPropertiesDto";
import { PropertyStatus } from "@entities/components/property/property";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindLandlordPropertiesSerializer extends AbstractSerializer<InputFindLandlordPropertiesSerializer> {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	landlordId!: string;

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

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	tenantName?: string;

	@IsOptional()
	@IsEnum(PropertyStatus)
	status?: PropertyStatus;
}

export type OutputFindLandlordPropertiesSerializer = OutputFindLandlordPropertiesDto;
