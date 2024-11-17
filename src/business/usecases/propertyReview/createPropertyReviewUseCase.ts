import type {
	InputCreatePropertyReviewDto,
	OutputCreatePropertyReviewDto,
} from "@business/dtos/propertyReview/createPropertyReviewDto";
import { PropertyNotFound } from "@business/errors/property";
import { CreatePropertyReviewGeneralError } from "@business/errors/propertyReview";
import { TenantNotFound } from "@business/errors/tenant";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IPropertyReviewRepository } from "@business/repositories/iPropertyReviewRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyReviewEntity } from "@entities/components/propertyReview/propertyReview";
import { left, right } from "@shared/either";

export class CreatePropertyReviewUseCase
	implements IUseCase<InputCreatePropertyReviewDto, OutputCreatePropertyReviewDto>
{
	constructor(
		private readonly propertyReviewRepository: IPropertyReviewRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly tenantRepository: ITenantRepository,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreatePropertyReviewDto): Promise<OutputCreatePropertyReviewDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			const tenant = await this.tenantRepository.findById(input.tenantId);
			if (!tenant) {
				return left(TenantNotFound);
			}

			const propertyReviewEntity = PropertyReviewEntity.create({
				id: this.uniqueIdentifierService.create(),
				comment: input.comment,
				rating: input.rating,
				property,
				tenant,
			});

			if (propertyReviewEntity.isLeft()) {
				return left(propertyReviewEntity.value);
			}

			const { id } = propertyReviewEntity.value.export();

			const createdPropertyReview = await this.propertyReviewRepository.create({
				id,
				propertyId: input.propertyId,
				tenantId: input.tenantId,
				comment: input.comment,
				rating: input.rating,
			});

			return right(createdPropertyReview);
		} catch (err) {
			return left(CreatePropertyReviewGeneralError);
		}
	}
}
