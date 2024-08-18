import type { InputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { CreateLandlordGeneralError } from "@business/errors/landlord";
import { makeCreateLandlordSut } from "@test/utility/suts/landlord/createLandlordSut";

describe("CreateLandlordUseCase", () => {
	const input: InputCreateLandlordDto = {
		email: "email",
		name: "name",
		number: "999999",
		password: "password",
	};

	it("should fail if findByEmail throws an exception", async () => {
		const { sut, landlordRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateLandlordGeneralError);
	});
});
