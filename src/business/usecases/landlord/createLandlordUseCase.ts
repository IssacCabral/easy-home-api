import type {
	InputCreateLandlordDto,
	OutputCreateLandlordDto,
} from "@business/dtos/landlord/createLandlordDto";
import {
	CreateLandlordGeneralError,
	LandlordAlreadyExists,
} from "@business/errors/landlord";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import {
	type ILandlordEntity,
	LandlordEntity,
} from "@entities/components/landlord/landlord";
import { left, right } from "@shared/either";

export class CreateLandlordUseCase
	implements IUseCase<InputCreateLandlordDto, OutputCreateLandlordDto>
{
	constructor(
		private readonly landlordRepository: ILandlordRepository,
		private readonly cryptService: ICryptService,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreateLandlordDto): Promise<OutputCreateLandlordDto> {
		try {
			const landlord = await this.landlordRepository.findByEmail(input.email);

			if (landlord) {
				return left(LandlordAlreadyExists);
			}

			const hashedPassword = await this.cryptService.generateHash(
				input.password,
			);

			const landlordEntity = LandlordEntity.create({
				id: this.uniqueIdentifierService.create(),
				email: input.email,
				name: input.name,
				number: input.number,
				password: hashedPassword,
			});

			if (landlordEntity.isLeft()) {
				return left(landlordEntity.value);
			}

			const createdLandlord = await this.landlordRepository.create(
				landlordEntity.value.export(),
			);

			return right(this.omitPassword(createdLandlord));
		} catch (err) {
			console.error(err);
			return left(CreateLandlordGeneralError);
		}
	}

	private omitPassword(
		obj: ILandlordEntity,
	): Omit<ILandlordEntity, "password"> {
		const { password, ...rest } = obj;

		return rest;
	}
}
