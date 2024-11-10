import type {
	InputCreateContactRequestDto,
	OutputCreateContactRequestDto,
} from "@business/contactRequest/createContactRequestDto";
import { ContactRequestAlreadyExists, CreateContactRequestGeneralError } from "@business/errors/contactRequest";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { omitPassword } from "@business/shared/omitPassword";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { left, right } from "@shared/either";

export class CreateContactRequestUseCase
	implements IUseCase<InputCreateContactRequestDto, OutputCreateContactRequestDto>
{
	constructor(private readonly contactRequestRepository: IContactRequestRepository) {}

	async exec(input: InputCreateContactRequestDto): Promise<OutputCreateContactRequestDto> {
		try {
			const { tenantId, propertyId } = input;

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
