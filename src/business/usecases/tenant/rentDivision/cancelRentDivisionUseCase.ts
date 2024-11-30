import type {
	InputCancelRentDivisionDto,
	OutputCancelRentDivisionDto,
} from "@business/dtos/tenant/rentDivision/cancelRentDivisionDto";
import { PropertyIsNotRentDivision, PropertyNotFound } from "@business/errors/property";
import { CancelRentDivisionGeneralError } from "@business/errors/rentDivision";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyStatus } from "@entities/components/property/property";
import { left, right } from "@shared/either";

export class CancelRentDivisionUseCase implements IUseCase<InputCancelRentDivisionDto, OutputCancelRentDivisionDto> {
	constructor(
		private readonly propertyRepository: IPropertyRepository,
		private readonly shareRequestRepository: IShareRequestRepository,
	) {}

	async exec(input: InputCancelRentDivisionDto): Promise<OutputCancelRentDivisionDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.SPLIT) {
				return left(PropertyIsNotRentDivision);
			}

			await this.shareRequestRepository.cancelAll(input.propertyId);
			await this.propertyRepository.updateStatus(input.propertyId, PropertyStatus.BUSY);

			return right(null);
		} catch (err) {
			return left(CancelRentDivisionGeneralError);
		}
	}
}
