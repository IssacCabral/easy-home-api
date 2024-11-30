import type {
	InputFindSharedRentalTenantsDto,
	OutputFindSharedRentalTenantsDto,
} from "@business/dtos/tenant/rentDivision/findSharedRentalTenantsDto";
import { PropertyNotFound } from "@business/errors/property";
import { FindSharedRentalTenantsGeneralError } from "@business/errors/rentDivision";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindSharedRentalTenantsUseCase
	implements IUseCase<InputFindSharedRentalTenantsDto, OutputFindSharedRentalTenantsDto>
{
	constructor(private readonly propertyRepository: IPropertyRepository) {}

	async exec(input: InputFindSharedRentalTenantsDto): Promise<OutputFindSharedRentalTenantsDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			const sharedRentalTenants = await this.propertyRepository.findTenantsOnProperty(input.propertyId);

			return right(sharedRentalTenants);
		} catch (err) {
			return left(FindSharedRentalTenantsGeneralError);
		}
	}
}
