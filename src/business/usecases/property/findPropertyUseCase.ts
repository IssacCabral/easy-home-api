import type { InputFindPropertyDto, OutputFindPropertyDto } from "@business/dtos/property/findPropertyDto";
import { FindPropertyGeneralError, PropertyNotFound } from "@business/errors/property";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindPropertyUseCase implements IUseCase<InputFindPropertyDto, OutputFindPropertyDto> {
	constructor(private readonly propertyRepository: IPropertyRepository) {}

	async exec(input: InputFindPropertyDto): Promise<OutputFindPropertyDto> {
		try {
			const property = await this.propertyRepository.findById(input.id);
			if (!property) {
				return left(PropertyNotFound);
			}

			console.log({ property });

			return right(property);
		} catch (err) {
			return left(FindPropertyGeneralError);
		}
	}
}
