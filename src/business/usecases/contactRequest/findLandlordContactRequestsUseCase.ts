import type {
	ContactRequestWithoutPasswordInTenant,
	InputFindLandlordContactRequestsDto,
	OutputFindLandlordContactRequestsDto,
} from "@business/contactRequest/findLandlordContactRequestDto";
import { FindLandlordContactRequestsGeneralError } from "@business/errors/contactRequest";
import { LandlordNotFound } from "@business/errors/landlord";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { omitPassword } from "@business/shared/omitPassword";
import { left, right } from "@shared/either";

export class FindLandlordContactRequestsUseCase
	implements IUseCase<InputFindLandlordContactRequestsDto, OutputFindLandlordContactRequestsDto>
{
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly landlordRepository: ILandlordRepository,
	) {}

	async exec(input: InputFindLandlordContactRequestsDto): Promise<OutputFindLandlordContactRequestsDto> {
		try {
			const landlord = await this.landlordRepository.findById(input.landlordId);

			if (!landlord) {
				return left(LandlordNotFound);
			}

			const landlordContactRequests = await this.contactRequestRepository.findLandlordContactRequests(input);
			const contactRequestsWithoutPasswordInTenant: ContactRequestWithoutPasswordInTenant[] =
				landlordContactRequests.data.map((item) => {
					return {
						...item,
						tenant: omitPassword(item.tenant),
					};
				});

			return right({
				meta: landlordContactRequests.meta,
				data: contactRequestsWithoutPasswordInTenant,
			});
		} catch (err) {
			console.error(err);
			return left(FindLandlordContactRequestsGeneralError);
		}
	}
}
