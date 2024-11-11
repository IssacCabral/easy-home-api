import type { InputRentPropertyDto, OutputRentPropertyDto } from "@business/dtos/contactRequest/rentPropertyDto";
import { ContactRequestNotFound, InvalidToRent, RentPropertyGeneralError } from "@business/errors/contactRequest";
import { PropertyNotAvailableToRent, PropertyNotFound } from "@business/errors/property";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { PropertyStatus } from "@entities/components/property/property";
import { left, right } from "@shared/either";

export class RentPropertyUseCase implements IUseCase<InputRentPropertyDto, OutputRentPropertyDto> {
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
	) {}

	async exec(input: InputRentPropertyDto): Promise<OutputRentPropertyDto> {
		try {
			const { tenantId, propertyId } = input;

			const property = await this.propertyRepository.findById(propertyId);

			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.FREE) {
				return left(PropertyNotAvailableToRent);
			}

			const contactRequest = await this.contactRequestRepository.findUnique(tenantId, propertyId);

			if (!contactRequest) {
				return left(ContactRequestNotFound);
			}

			if (contactRequest.status !== ContactRequestStatus.IN_CONTACT) {
				return left(InvalidToRent);
			}

			await this.contactRequestRepository.finalizePendingContactRequests(tenantId, propertyId);
			await this.propertyRepository.saveTenantOnProperty({
				tenantId,
				propertyId,
				isMainTenant: true,
			});

			const contactRequestRented = await this.contactRequestRepository.rentProperty(tenantId, propertyId);

			return right(contactRequestRented);
		} catch (err) {
			return left(RentPropertyGeneralError);
		}
	}
}
