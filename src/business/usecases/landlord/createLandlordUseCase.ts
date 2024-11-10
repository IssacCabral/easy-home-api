import type { InputCreateLandlordDto, OutputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { CreateLandlordGeneralError } from "@business/errors/landlord";
import { EmailNotAvailable } from "@business/errors/user";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { omitPassword } from "@business/shared/omitPassword";
import { LandlordEntity } from "@entities/components/landlord/landlord";
import { left, right } from "@shared/either";

export class CreateLandlordUseCase implements IUseCase<InputCreateLandlordDto, OutputCreateLandlordDto> {
	constructor(
		private readonly landlordRepository: ILandlordRepository,
		private readonly tenantRepository: ITenantRepository,
		private readonly cryptService: ICryptService,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreateLandlordDto): Promise<OutputCreateLandlordDto> {
		try {
			const landlord = await this.landlordRepository.findByEmail(input.email);
			const tenant = await this.tenantRepository.findByEmail(input.email);

			if (tenant || landlord) {
				return left(EmailNotAvailable);
			}

			const hashedPassword = await this.cryptService.generateHash(input.password);
			const landlordEntity = LandlordEntity.create({
				id: this.uniqueIdentifierService.create(),
				email: input.email,
				name: input.name,
				phone: input.phone,
				password: hashedPassword,
			});

			if (landlordEntity.isLeft()) {
				return left(landlordEntity.value);
			}

			const createdLandlord = await this.landlordRepository.create(landlordEntity.value.export());

			return right(omitPassword(createdLandlord));
		} catch (err) {
			return left(CreateLandlordGeneralError);
		}
	}
}
