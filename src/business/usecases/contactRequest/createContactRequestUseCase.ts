import type {
	InputCreateContactRequestDto,
	OutputCreateContactRequestDto,
} from "@business/contactRequest/createContactRequestDto";
import { ContactRequestAlreadyExists, CreateContactRequestGeneralError } from "@business/errors/contactRequest";
import { PropertyNotAvailableToContactRequest, PropertyNotFound } from "@business/errors/property";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { omitPassword } from "@business/shared/omitPassword";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { PropertyStatus } from "@entities/components/property/property";
import { left, right } from "@shared/either";

export class CreateContactRequestUseCase
	implements IUseCase<InputCreateContactRequestDto, OutputCreateContactRequestDto>
{
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
	) {}

	async exec(input: InputCreateContactRequestDto): Promise<OutputCreateContactRequestDto> {
		try {
			const { tenantId, propertyId } = input;

			const property = await this.propertyRepository.findById(propertyId);

			if (!property) {
				return left(PropertyNotFound);
			}

			if (property.status !== PropertyStatus.FREE) {
				return left(PropertyNotAvailableToContactRequest);
			}

			if (await this.contactRequestAlreadyExists(tenantId, propertyId)) {
				return left(ContactRequestAlreadyExists);
			}

			const createdContactRequest = await this.contactRequestRepository.create({
				status: ContactRequestStatus.IN_CONTACT,
				tenantId: tenantId,
				propertyId: propertyId,
			});

			return right({
				...createdContactRequest,
				tenant: omitPassword(createdContactRequest.tenant),
			});
		} catch (err) {
			return left(CreateContactRequestGeneralError);
		}
	}

	private async contactRequestAlreadyExists(tenantId: string, propertyId: string): Promise<boolean> {
		const contactRequestFound = await this.contactRequestRepository.findUnique(tenantId, propertyId);
		return contactRequestFound !== null;
	}
}
