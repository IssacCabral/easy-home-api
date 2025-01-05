import type {
	InputFindShareRequestsDto,
	OutputFindShareRequestsDto,
} from "@business/dtos/tenant/shareRequest/findShareRequestsDto";
import { PropertyNotFound } from "@business/errors/property";
import { FindShareRequestsGeneralError } from "@business/errors/shareRequest";
import type { IPropertyRepository } from "@business/repositories/iPropertyRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class FindShareRequestsUseCase implements IUseCase<InputFindShareRequestsDto, OutputFindShareRequestsDto> {
	constructor(
		private readonly shareRequestRepository: IShareRequestRepository,
		private readonly propertyRepository: IPropertyRepository,
	) {}

	async exec(input: InputFindShareRequestsDto): Promise<OutputFindShareRequestsDto> {
		try {
			const property = await this.propertyRepository.findById(input.propertyId);
			if (!property) {
				return left(PropertyNotFound);
			}

			const shareRequests = await this.shareRequestRepository.findMany(input.propertyId);

			return right(shareRequests);
		} catch (err) {
			return left(FindShareRequestsGeneralError);
		}
	}
}
