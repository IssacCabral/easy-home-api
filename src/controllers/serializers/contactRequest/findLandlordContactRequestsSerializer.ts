import type { OutputFindLandlordContactRequestsDto } from "@business/dtos/contactRequest/findLandlordContactRequestDto";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputFindLandlordContactRequestsSerializer extends AbstractSerializer<InputFindLandlordContactRequestsSerializer> {
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
	@IsEnum(ContactRequestStatus)
	status?: ContactRequestStatus;
}

export type OutputFindLandlordContactRequestsSerializer = OutputFindLandlordContactRequestsDto;
