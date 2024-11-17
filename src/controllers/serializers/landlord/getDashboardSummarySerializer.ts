import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";
import type { OutputGetDashboardSummaryDto } from "@business/dtos/landlord/getDashboardSummaryDto";

export class InputGetDashboardSummarySerializer extends AbstractSerializer<InputGetDashboardSummarySerializer> {
	@IsNotEmpty()
	@IsUUID()
	landlordId!: string;
}

export type OutputGetDashboardSummarySerializer = OutputGetDashboardSummaryDto;
