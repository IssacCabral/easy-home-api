import type { InputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { CreateTenantGeneralError } from "@business/errors/tenant";
import { makeCreateTenantSut } from "@test/utility/suts/tenant/createTenantSut";

describe("CreateTenantUseCase", () => {
	const input: InputCreateLandlordDto = {
		email: "email",
		name: "name",
		number: "999999",
		password: "password",
	};

	it("should fail if findByEmail throws an exception", async () => {
		const { sut, tenantRepositoryStub } = makeCreateTenantSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateTenantGeneralError);
	});
});
