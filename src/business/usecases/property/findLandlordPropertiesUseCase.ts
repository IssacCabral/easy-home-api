import type {
	InputFindLandlordPropertiesDto,
	OutputFindLandlordPropertiesDto,
} from "@business/dtos/property/findLandlordPropertiesDto";
import { LandlordNotFound } from "@business/errors/landlord";
import { FindLandlordPropertiesGeneralError } from "@business/errors/property";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindLandlordPropertiesUseCase
	implements IUseCase<InputFindLandlordPropertiesDto, OutputFindLandlordPropertiesDto>
{
	constructor(
		private readonly propertyRepository: IPropertyRepository,
		private readonly landlordRepository: ILandlordRepository,
	) {}

	async exec(input: InputFindLandlordPropertiesDto): Promise<OutputFindLandlordPropertiesDto> {
		try {
			const landlord = await this.landlordRepository.findById(input.landlordId);

			if (!landlord) {
				return left(LandlordNotFound);
			}

			const landlordProperties = await this.propertyRepository.findLandlordProperties(input);

			return right(landlordProperties);
		} catch (err) {
			console.error(err);
			return left(FindLandlordPropertiesGeneralError);
		}
	}
}
