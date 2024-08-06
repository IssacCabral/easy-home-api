import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";
import { v4 } from "uuid";

export class UniqueIdentifierService implements IUniqueIdentifierService {
	create(): string {
		return v4();
	}
}
