import type {
	InputStopTenantRentDivisionDto,
	OutputStopTenantRentDivisionDto,
} from "@business/dtos/tenant/rentDivision/stopTenantRentDivisionDto";
import { PropertyIsNotBusy, PropertyNotFound } from "@business/errors/property";
import { StopTenantRentDivisionGeneralError } from "@business/errors/rentDivision";
import { TenantCannotBeMain, TenantInAnotherProperty, TenantNotFoundOnProperty } from "@business/errors/tenant";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyStatus } from "@entities/components/property/property";
import { left, right } from "@shared/either";

export class StopTenantRentDivisionUseCase
	implements IUseCase<InputStopTenantRentDivisionDto, OutputStopTenantRentDivisionDto>
{
	constructor(private readonly propertyRepository: IPropertyRepository) {}

	async exec(input: InputStopTenantRentDivisionDto): Promise<OutputStopTenantRentDivisionDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.BUSY) {
				return left(PropertyIsNotBusy);
			}

			const tenantOnProperty = await this.propertyRepository.findTenantOnProperty(input.tenantId);
			if (!tenantOnProperty) {
				return left(TenantNotFoundOnProperty);
			}

			if (tenantOnProperty.property.id !== property.id) {
				return left(TenantInAnotherProperty);
			}

			if (tenantOnProperty.isMainTenant) {
				return left(TenantCannotBeMain);
			}

			await this.propertyRepository.removeTenantOnProperty(input.tenantId);

			const updatedProperty = await this.propertyRepository.findById(input.propertyId);
			if (!updatedProperty) {
				return left(PropertyNotFound);
			}

			return right(updatedProperty);
		} catch (err) {
			return left(StopTenantRentDivisionGeneralError);
		}
	}
}
