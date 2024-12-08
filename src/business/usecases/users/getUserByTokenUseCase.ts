import type { InputGetUserByTokenDto, OutputGetUserByTokenDto } from "@business/dtos/user/getUserByTokenDto";
import { GetUserByTokenGeneralError, UserIsNotFoundError } from "@business/errors/user";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { IJwtService } from "@business/services/iJwtService";
import type { IUseCase } from "@business/shared/iUseCase";
import type { ILandlordEntity } from "@entities/components/landlord/landlord";
import type { ITenantEntity } from "@entities/components/tenant/tenant";
import { left, right } from "@shared/either";

export class GetUserByTokenUseCase implements IUseCase<InputGetUserByTokenDto, OutputGetUserByTokenDto> {
	constructor(
		private readonly jwtService: IJwtService,
		private readonly tenantRepository: ITenantRepository,
		private readonly landlordRepository: ILandlordRepository,
	) {}

	async exec(input: InputGetUserByTokenDto): Promise<OutputGetUserByTokenDto> {
		try {
			const payload = this.jwtService.verifyToken(input.token);

			if (payload.isLeft()) {
				return left(payload.value);
			}

			const { userId, isLandlord } = payload.value.payload;

			let user: ILandlordEntity | ITenantEntity | null;

			if (isLandlord) {
				user = await this.landlordRepository.findById(userId);
			} else {
				user = await this.tenantRepository.findById(userId);
			}

			if (!user) {
				return left(UserIsNotFoundError);
			}

			return right({
				id: user.id,
				email: user.email,
				name: user.name,
				isLandlord,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (err: any) {
			return left(GetUserByTokenGeneralError(err?.message));
		}
	}
}
