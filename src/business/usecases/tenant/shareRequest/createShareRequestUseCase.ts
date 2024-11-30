import type {
	InputCreateShareRequestDto,
	OutputCreateShareRequestDto,
} from "@business/dtos/tenant/rentDivision/createShareRequestDto";
import { PropertyNotFound, TenantIsAlreadyInAProperty } from "@business/errors/property";
import {
	CreateShareRequestGeneralError,
	PropertyNotAvailableToShareRequest,
	ShareRequestAlreadyExists,
} from "@business/errors/shareRequest";
import { TenantNotFound } from "@business/errors/tenant";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { PropertyStatus } from "@entities/components/property/property";
import { ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";
import { left, right } from "@shared/either";

export class CreateShareRequestUseCase implements IUseCase<InputCreateShareRequestDto, OutputCreateShareRequestDto> {
	constructor(
		private readonly shareRequestRepository: IShareRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly tenantRepository: ITenantRepository,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreateShareRequestDto): Promise<OutputCreateShareRequestDto> {
		try {
			const tenant = await this.tenantRepository.findById(input.tenantId);
			if (!tenant) {
				return left(TenantNotFound);
			}

			const tenantOnProperty = await this.propertyRepository.findTenantOnProperty(input.tenantId);
			if (tenantOnProperty) {
				return left(TenantIsAlreadyInAProperty);
			}

			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.SPLIT) {
				return left(PropertyNotAvailableToShareRequest);
			}

			const shareRequest = await this.shareRequestRepository.findInContact(input.tenantId, input.propertyId);
			if (shareRequest) {
				return left(ShareRequestAlreadyExists);
			}

			const createdShareRequest = await this.shareRequestRepository.create({
				id: this.uniqueIdentifierService.create(),
				status: ShareRequestStatus.IN_CONTACT,
				tenantId: input.tenantId,
				propertyId: input.propertyId,
			});

			return right(createdShareRequest);
		} catch (err) {
			console.error(err);
			return left(CreateShareRequestGeneralError);
		}
	}
}
