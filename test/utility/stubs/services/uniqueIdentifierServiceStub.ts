import type { IUniqueIdentifierService } from "@business/services/iUniqueIdentifierService";

class UniqueIdentifierServiceStub implements IUniqueIdentifierService {
	create(): string {
		return "ee1f2951-8cb7-4377-9f54-bf8ee9443074";
	}
}

export const makeUniqueIdentifierServiceStub = (): IUniqueIdentifierService => {
	return new UniqueIdentifierServiceStub();
};
