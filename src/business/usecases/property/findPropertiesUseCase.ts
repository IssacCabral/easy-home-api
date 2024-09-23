import type { InputFindPropertiesDto, OutputFindPropertiesDto } from "@business/dtos/property/findPropertiesDto";
import { FindPropertiesGeneralError } from "@business/errors/property";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindPropertiesUseCase implements IUseCase<InputFindPropertiesDto, OutputFindPropertiesDto> {
	constructor(private readonly propertyRepository: IPropertyRepository) {}

	async exec(input: InputFindPropertiesDto): Promise<OutputFindPropertiesDto> {
		try {
			/**
			 * Avenida Francisco Pinheiro de Almeida - Ponto central
			 * lat "-4.9655912"
			 * lon "-39.0251186"
			 */
			const properties = await this.propertyRepository.findMany(input);
			return right(properties);
		} catch (err) {
			console.error(err);
			return left(FindPropertiesGeneralError);
		}
	}
}
