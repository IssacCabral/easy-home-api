import type {
	InputOpenRentDivisionDto,
	OutputOpenRentDivisionDto,
} from "@business/dtos/tenant/rentDivision/openRentDivisionDto";
import { PropertyNotFound } from "@business/errors/property";
import { OpenRentDivisionGeneralError, PropertyNotAvailableToRentDivision } from "@business/errors/rentDivision";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyStatus } from "@entities/components/property/property";
import { left, right } from "@shared/either";

export class OpenRentDivisionUseCase implements IUseCase<InputOpenRentDivisionDto, OutputOpenRentDivisionDto> {
	constructor(private readonly propertyRepository: IPropertyRepository) {}

	async exec(input: InputOpenRentDivisionDto): Promise<OutputOpenRentDivisionDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.BUSY) {
				return left(PropertyNotAvailableToRentDivision);
			}

			const updatedProperty = await this.propertyRepository.updateStatus(input.propertyId, PropertyStatus.SPLIT);

			return right(updatedProperty);
		} catch (err) {
			return left(OpenRentDivisionGeneralError);
		}
	}
}
