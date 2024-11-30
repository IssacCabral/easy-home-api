import type {
	InputFinishShareRequestDto,
	OutputFinishShareRequestDto,
} from "@business/dtos/tenant/shareRequest/finishShareRequestDto";
import {
	FinishShareRequestGeneralError,
	ShareRequestAlreadyFinished,
	ShareRequestAlreadySelected,
	ShareRequestNotFound,
} from "@business/errors/shareRequest";
import type { IShareRequestRepository } from "@business/repositories/iShareRequestRepository";
import type { IUseCase } from "@business/shared/iUseCase";
import { ShareRequestStatus } from "@entities/components/tenant/shareRequest/shareRequest";
import { left, right } from "@shared/either";

export class FinishShareRequestUseCase implements IUseCase<InputFinishShareRequestDto, OutputFinishShareRequestDto> {
	constructor(private readonly shareRequestRepository: IShareRequestRepository) {}

	async exec(input: InputFinishShareRequestDto): Promise<OutputFinishShareRequestDto> {
		try {
			const shareRequest = await this.shareRequestRepository.findById(input.shareRequestId);
			if (!shareRequest) {
				return left(ShareRequestNotFound);
			}

			if (shareRequest.status === ShareRequestStatus.FINISHED) {
				return left(ShareRequestAlreadyFinished);
			}

			if (shareRequest.status === ShareRequestStatus.SELECTED) {
				return left(ShareRequestAlreadySelected);
			}

			const finishedShareRequest = await this.shareRequestRepository.finish(shareRequest.id);

			return right(finishedShareRequest);
		} catch (err) {
			console.error(err);
			return left(FinishShareRequestGeneralError);
		}
	}
}
