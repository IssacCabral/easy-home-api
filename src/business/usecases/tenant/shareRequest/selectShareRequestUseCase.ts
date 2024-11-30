import type {
	InputSelectShareRequestDto,
	OutputSelectShareRequestDto,
} from "@business/dtos/tenant/shareRequest/selectShareRequestDto";
import {
	SelectShareRequestGeneralError,
	ShareRequestAlreadyFinished,
	ShareRequestAlreadySelected,
	ShareRequestNotFound,
} from "@business/errors/shareRequest";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";
import { left, right } from "@shared/either";

export class SelectShareRequestUseCase implements IUseCase<InputSelectShareRequestDto, OutputSelectShareRequestDto> {
	constructor(private readonly shareRequestRepository: IShareRequestRepository) {}

	async exec(input: InputSelectShareRequestDto): Promise<OutputSelectShareRequestDto> {
		try {
			const shareRequest = await this.shareRequestRepository.findById(input.shareRequestId);
			if (!shareRequest) {
				return left(ShareRequestNotFound);
			}

			if (shareRequest.status === ShareRequestStatus.SELECTED) {
				return left(ShareRequestAlreadySelected);
			}

			if (shareRequest.status === ShareRequestStatus.FINISHED) {
				return left(ShareRequestAlreadyFinished);
			}

			const selectedShareRequest = await this.shareRequestRepository.selectTenant(shareRequest.id);

			return right(selectedShareRequest);
		} catch (err) {
			console.error(err);
			return left(SelectShareRequestGeneralError);
		}
	}
}
