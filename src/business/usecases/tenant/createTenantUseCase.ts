import type { InputCreateTenantDto, OutputCreateTenantDto } from "@business/dtos/tenant/createTenantDto";
import { CreateTenantGeneralError } from "@business/errors/tenant";
import { EmailNotAvailable } from "@business/errors/user";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { type ITenantEntity, TenantEntity } from "@entities/components/tenant/tenant";
import { left, right } from "@shared/either";

export class CreateTenantUseCase implements IUseCase<InputCreateTenantDto, OutputCreateTenantDto> {
	constructor(
		private readonly tenantRepository: ITenantRepository,
		private readonly landlordRepository: ILandlordRepository,
		private readonly cryptService: ICryptService,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreateTenantDto): Promise<OutputCreateTenantDto> {
		try {
			const tenant = await this.tenantRepository.findByEmail(input.email);
			const landlord = await this.landlordRepository.findByEmail(input.email);

			if (tenant || landlord) {
				return left(EmailNotAvailable);
			}

			const hashedPassword = await this.cryptService.generateHash(input.password);
			const tenantEntity = TenantEntity.create({
				id: this.uniqueIdentifierService.create(),
				email: input.email,
				name: input.name,
				phone: input.phone,
				password: hashedPassword,
			});

			if (tenantEntity.isLeft()) {
				return left(tenantEntity.value);
			}

			const createdTenant = await this.tenantRepository.create(tenantEntity.value.export());

			return right(this.omitPassword(createdTenant));
		} catch (err) {
			return left(CreateTenantGeneralError);
		}
	}

	private omitPassword(obj: ITenantEntity): Omit<ITenantEntity, "password"> {
		const { password, ...rest } = obj;
		return rest;
	}
}
