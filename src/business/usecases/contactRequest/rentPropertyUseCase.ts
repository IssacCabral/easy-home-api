import type { InputRentPropertyDto, OutputRentPropertyDto } from "@business/dtos/contactRequest/rentPropertyDto";
import { ContactRequestNotFound, InvalidToRent, RentPropertyGeneralError } from "@business/errors/contactRequest";
import {} from "@business/errors/property";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { left, right } from "@shared/either";

export class RentPropertyUseCase implements IUseCase<InputRentPropertyDto, OutputRentPropertyDto> {
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
		private readonly shareRequestRepository: IShareRequestRepository,
	) {}

	async exec(input: InputRentPropertyDto): Promise<OutputRentPropertyDto> {
		try {
			const contactRequest = await this.contactRequestRepository.findById(input.contactRequestId);

			if (!contactRequest) {
				return left(ContactRequestNotFound);
			}

			if (contactRequest.status !== ContactRequestStatus.IN_CONTACT) {
				return left(InvalidToRent);
			}

			const tenantId = contactRequest.tenant.id;
			const propertyId = contactRequest.property.id;

			await this.contactRequestRepository.finalizePendingContactRequests(tenantId, propertyId);
			await this.shareRequestRepository.cancelTenantOnShareRequests(tenantId);
			await this.propertyRepository.saveTenantOnProperty({
				tenantId,
				propertyId,
				isMainTenant: true,
			});

			const contactRequestRented = await this.contactRequestRepository.rentProperty(input.contactRequestId);

			return right(contactRequestRented);
		} catch (err) {
			return left(RentPropertyGeneralError);
		}
	}
}
