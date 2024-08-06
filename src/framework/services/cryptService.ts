import type { ICryptService } from "@business/services/iCryptService";
import * as bcrypt from "bcrypt";

export class CryptService implements ICryptService {
	private readonly SALT = 12;

	async generateHash(value: string): Promise<string> {
		return await bcrypt.hash(value, this.SALT);
	}

	async compareHash(value: string, hashedValue: string): Promise<boolean> {
		return await bcrypt.compare(value, hashedValue);
	}
}
