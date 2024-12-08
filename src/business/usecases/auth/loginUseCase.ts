import type { InputLoginDto, OutputLoginDto } from "@business/dtos/auth/loginDto";
import { InvalidCredentialsError, LoginGeneralError } from "@business/errors/auth";
import type { ILandlordRepository } from "@business/repositories/iLandlordRepository";
import type { ITenantRepository } from "@business/repositories/iTenantRepository";
import type { ICryptService } from "@business/services/iCryptService";
import type { IJwtService } from "@business/services/iJwtService";
import type { IUseCase } from "@business/shared/iUseCase";
import { left, right } from "@shared/either";

export class LoginUseCase implements IUseCase<InputLoginDto, OutputLoginDto> {
	constructor(
		private readonly tenantRepository: ITenantRepository,
		private readonly landlordRepository: ILandlordRepository,
		private readonly cryptService: ICryptService,
		private readonly jwtService: IJwtService,
	) {}

	async exec(input: InputLoginDto): Promise<OutputLoginDto> {
		try {
			const { email, password } = input;
			const [tenant, landlord] = await Promise.all([
				this.tenantRepository.findByEmail(email),
				this.landlordRepository.findByEmail(email),
			]);

			if (!tenant && !landlord) {
				return left(InvalidCredentialsError);
			}

			const user = tenant ?? landlord;
			if (!user) {
				return left(InvalidCredentialsError);
			}

			const isValidPassword = await this.cryptService.compareHash(password, user.password);
			if (!isValidPassword) {
				return left(InvalidCredentialsError);
			}

			const isLandlord = !!landlord;
			const token = this.jwtService.generateToken({
				userId: user.id,
				email: user.email,
				userName: user.name,
				isLandlord,
			});

			return right({
				userId: user.id,
				email: user.email,
				name: user.name,
				isLandlord,
				accessToken: token,
			});
		} catch (err) {
			return left(LoginGeneralError);
		}
	}
}
