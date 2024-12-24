import type {
	InputCreateContactRequestDto,
	OutputCreateContactRequestDto,
} from "@business/dtos/contactRequest/createContactRequestDto";
import { ContactRequestAlreadyExists, CreateContactRequestGeneralError } from "@business/errors/contactRequest";
import {
	PropertyNotAvailableToContactRequest,
	PropertyNotFound,
	TenantIsAlreadyInAProperty,
} from "@business/errors/property";
import { TenantNotFound } from "@business/errors/tenant";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import type { IUseCase } from "@business/shared/iUseCase";
import { omitPassword } from "@business/shared/omitPassword";
import { ContactRequestStatus, type IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import { type IPropertyEntity, PropertyStatus } from "@entities/components/property/property";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import { type Either, left, right } from "@shared/either";
import type { IError } from "@shared/iError";

export class CreateContactRequestUseCase
	implements IUseCase<InputCreateContactRequestDto, OutputCreateContactRequestDto>
{
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly tenantRepository: ITenantRepository,
		private readonly uniqueIdentifierService: IUniqueIdentifierService,
	) {}

	async exec(input: InputCreateContactRequestDto): Promise<OutputCreateContactRequestDto> {
		try {
			const [tenantOnProperty, property, tenant, contactRequest] = await this.fetchDependencies(
				input.tenantId,
				input.propertyId,
			);

			const tenantValidation = this.validateTenant(tenant, tenantOnProperty);
			if (tenantValidation.isLeft()) return left(tenantValidation.value);

			const propertyValidation = this.validateProperty(property);
			if (propertyValidation.isLeft()) return left(propertyValidation.value);

			const contactRequestValidation = this.validateContactRequest(contactRequest);
			if (contactRequestValidation.isLeft()) return left(contactRequestValidation.value);

			const createdContactRequest = await this.contactRequestRepository.create({
				id: this.uniqueIdentifierService.create(),
				status: ContactRequestStatus.IN_CONTACT,
				tenantId: input.tenantId,
				propertyId: input.propertyId,
			});

			return right({
				...createdContactRequest,
				tenant: omitPassword(createdContactRequest.tenant),
			});
		} catch (err) {
			console.error(err);
			return left(CreateContactRequestGeneralError);
		}
	}

	private async tenantIsAlreadyInAProperty(tenantId: string): Promise<boolean> {
		const tenantOnProperty = await this.propertyRepository.findTenantOnProperty(tenantId);
		return tenantOnProperty !== null;
	}

	private async fetchDependencies(tenantId: string, propertyId: string) {
		return await Promise.all([
			this.tenantIsAlreadyInAProperty(tenantId),
			this.propertyRepository.findById(propertyId),
			this.tenantRepository.findById(tenantId),
			this.contactRequestRepository.findInContact(tenantId, propertyId),
		]);
	}

	private validateTenant(tenant: ITenantEntity | null, tenantOnProperty: boolean): Either<IError, null> {
		if (!tenant) {
			return left(TenantNotFound);
		}

		if (tenantOnProperty) {
			return left(TenantIsAlreadyInAProperty);
		}

		return right(null);
	}

	private validateProperty(property: IPropertyEntity | null): Either<IError, null> {
		if (!property) {
			return left(PropertyNotFound);
		}

		if (property.status !== PropertyStatus.FREE) {
			return left(PropertyNotAvailableToContactRequest);
		}

		return right(null);
	}

	private validateContactRequest(contactRequest: IContactRequestEntity | null): Either<IError, null> {
		if (contactRequest) {
			return left(ContactRequestAlreadyExists);
		}

		return right(null);
	}
}
