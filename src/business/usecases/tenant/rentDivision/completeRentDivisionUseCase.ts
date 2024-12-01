import type {
	InputCompleteRentDivisionDto,
	OutputCompleteRentDivisionDto,
} from "@business/dtos/tenant/rentDivision/completeRentDivisionDto";
import {
	NoTenantsSelectedToRentDivision,
	PropertyIsNotRentDivision,
	PropertyNotFound,
} from "@business/errors/property";
import { CompleteRentDivisionGeneralError } from "@business/errors/rentDivision";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyStatus } from "@entities/components/property/property";
import { ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";
import { left, right } from "@shared/either";

export class CompleteRentDivisionUseCase
	implements IUseCase<InputCompleteRentDivisionDto, OutputCompleteRentDivisionDto>
{
	constructor(
		private readonly propertyRepository: IPropertyRepository,
		private readonly shareRequestRepository: IShareRequestRepository,
		private readonly contactRequestRepository: IContactRequestRepository,
	) {}

	async exec(input: InputCompleteRentDivisionDto): Promise<OutputCompleteRentDivisionDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.SPLIT) {
				return left(PropertyIsNotRentDivision);
			}

			const shareRequests = await this.shareRequestRepository.findByStatus(
				input.propertyId,
				ShareRequestStatus.SELECTED,
			);

			if (shareRequests.length === 0) {
				return left(NoTenantsSelectedToRentDivision);
			}

			await Promise.all(
				shareRequests.map((shareRequest) => {
					this.propertyRepository.saveTenantOnProperty({
						isMainTenant: false,
						propertyId: input.propertyId,
						tenantId: shareRequest.tenant.id,
					});
				}),
			);

			await Promise.all(
				shareRequests.map((shareRequest) => {
					this.contactRequestRepository.closePendingsByTenantId(shareRequest.tenant.id);
				}),
			);

			await this.shareRequestRepository.cancelAll(input.propertyId);

			return right(null);
		} catch (err) {
			return left(CompleteRentDivisionGeneralError);
		}
	}
}
