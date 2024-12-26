import type {
	InputFindPropertiesOfInterestDto,
	OutputFindPropertiesOfInterestDto,
	PropertiesOfInterest,
} from "@business/dtos/tenant/findPropertiesOfInterestDto";
import { PropertiesOfInterestStatus } from "@business/dtos/tenant/findPropertiesOfInterestDto";
import { FindPropertiesOfInterestGeneralError } from "@business/errors/tenant";
import type { IContactRequestRepository } from "@business/repositories/iContactRequestRepository";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import type { IContactRequestEntity } from "@entities/components/contactRequest/contactRequest";
import type { IShareRequestEntity } from "@entities/components/tenant/shareRequest/shareRequest";
import { left, right } from "@shared/either";

export class FindPropertiesOfInterestUseCase
	implements IUseCase<InputFindPropertiesOfInterestDto, OutputFindPropertiesOfInterestDto>
{
	constructor(
		private readonly contactRequestRepository: IContactRequestRepository,
		private readonly shareRequestRepository: IShareRequestRepository,
	) {}

	async exec(input: InputFindPropertiesOfInterestDto): Promise<OutputFindPropertiesOfInterestDto> {
		try {
			const contactRequests = await this.contactRequestRepository.findTenantContactRequests(input.tenantId);
			const shareRequests = await this.shareRequestRepository.findByTenant(input.tenantId);

			const propertiesOfInterest: PropertiesOfInterest[] = [
				...this.mapToPropertiesOfInterestType(contactRequests, "individual"),
				...this.mapToPropertiesOfInterestType(shareRequests, "shared"),
			];

			return right(propertiesOfInterest);
		} catch (err) {
			return left(FindPropertiesOfInterestGeneralError);
		}
	}

	private mapToPropertiesOfInterestType(
		data: IContactRequestEntity[] | IShareRequestEntity[],
		type: "shared" | "individual",
	): PropertiesOfInterest[] {
		return data.map((item) => ({
			id: item.id,
			property: item.property,
			requestDate: item.requestDate,
			type,
			status: PropertiesOfInterestStatus[item.status] as PropertiesOfInterestStatus,
			finalizationReason: item.finalizationReason,
		}));
	}
}
