import type {
	InputGetDashboardSummaryDto,
	OutputGetDashboardSummaryDto,
} from "@business/dtos/landlord/getDashboardSummaryDto";
import { GetDashboardSummaryGeneralError, LandlordNotFound } from "@business/errors/landlord";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class GetDashboardSummaryUseCase implements IUseCase<InputGetDashboardSummaryDto, OutputGetDashboardSummaryDto> {
	constructor(private readonly landlordRepository: ILandlordRepository) {}

	async exec(input: InputGetDashboardSummaryDto): Promise<OutputGetDashboardSummaryDto> {
		try {
			const landlord = await this.landlordRepository.findById(input.landlordId);
			if (!landlord) {
				return left(LandlordNotFound);
			}

			const dashboardSummary = await this.landlordRepository.getDashboardSummary(input.landlordId);

			return right(dashboardSummary);
		} catch (err) {
			return left(GetDashboardSummaryGeneralError);
		}
	}
}
