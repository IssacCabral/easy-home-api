import type { OutputGetDashboardSummaryDto } from "@business/dtos/landlord/getDashboardSummaryDto";
import { IsNotEmpty, IsUUID } from "class-validator";
import { AbstractSerializer } from "../abstractSerializer";

export class InputGetDashboardSummarySerializer extends AbstractSerializer<InputGetDashboardSummarySerializer> {
	@IsNotEmpty()
	@IsUUID()
	landlordId!: string;
}

export type OutputGetDashboardSummarySerializer = OutputGetDashboardSummaryDto;
