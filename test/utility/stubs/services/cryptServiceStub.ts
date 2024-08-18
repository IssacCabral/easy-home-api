import type { ICryptService } from "@business/services/iCryptService";

class CryptServiceStub implements ICryptService {
	async generateHash(value: string): Promise<string> {
		return "hash";
	}

	async compareHash(value: string, hashedValue: string): Promise<boolean> {
		return true;
	}
}

export const makeCryptService = (): ICryptService => {
	return new CryptServiceStub();
};
