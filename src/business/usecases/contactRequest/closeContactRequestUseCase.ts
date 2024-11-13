import type {
	InputCloseContactRequestDto,
	OutputCloseContactRequestDto,
} from "@business/dtos/contactRequest/closeContactRequestDto";
import {
	CloseContactRequestGeneralError,
	ContactRequestNotFound,
	InvalidToCloseContactRequest,
} from "@business/errors/contactRequest";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { ContactRequestStatus } from "@entities/components/contactRequest/contactRequest";
import { left, right } from "@shared/either";

export class CloseContactRequestUseCase implements IUseCase<InputCloseContactRequestDto, OutputCloseContactRequestDto> {
	constructor(private readonly contactRequestRepository: IContactRequestRepository) {}

	async exec(input: InputCloseContactRequestDto): Promise<OutputCloseContactRequestDto> {
		try {
			const { tenantId, propertyId, reason } = input;

			const contactRequest = await this.contactRequestRepository.findUnique(tenantId, propertyId);

			if (!contactRequest) {
				return left(ContactRequestNotFound);
			}

			if (contactRequest.status !== ContactRequestStatus.IN_CONTACT) {
				return left(InvalidToCloseContactRequest);
			}

			const closedContactRequest = await this.contactRequestRepository.close({
				tenantId,
				propertyId,
				reason,
			});

			return right(closedContactRequest);
		} catch (err) {
			return left(CloseContactRequestGeneralError);
		}
	}
}
