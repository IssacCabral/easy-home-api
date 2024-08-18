import type { InputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { CreateLandlordGeneralError, LandlordAlreadyExists } from "@business/errors/landlord";
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

	it("should calls findByEmail with correct input", async () => {
		const { sut, landlordRepositoryStub } = makeCreateLandlordSut();
		const spy = jest.spyOn(landlordRepositoryStub, "findByEmail");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.email);
	});

	it("should return left if landlord already exists", async () => {
		const { sut } = makeCreateLandlordSut();
		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(LandlordAlreadyExists);
	});

	it("should fail if generateHash throws an exception", async () => {
		const { sut, cryptServiceStub, landlordRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(cryptServiceStub, "generateHash").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateLandlordGeneralError);
	});

	it("should calls generateHash with correct input", async () => {
		const { sut, landlordRepositoryStub, cryptServiceStub } = makeCreateLandlordSut();
		const spy = jest.spyOn(cryptServiceStub, "generateHash");

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.password);
	});
});
