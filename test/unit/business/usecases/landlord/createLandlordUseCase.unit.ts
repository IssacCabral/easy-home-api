import type { InputCreateLandlordDto } from "@business/dtos/landlord/createLandlordDto";
import { CreateLandlordGeneralError } from "@business/errors/landlord";
import { EmailNotAvailable } from "@business/errors/user";
import { LandlordEntity } from "@entities/components/landlord/landlord";
import { left } from "@shared/either";
import { fakeIError } from "@test/utility/fakes/error";
import { fakeLandlordEntity } from "@test/utility/fakes/landlordEntity";
import { makeCreateLandlordSut } from "@test/utility/suts/landlord/createLandlordSut";

describe("CreateLandlordUseCase", () => {
	const input: InputCreateLandlordDto = {
		email: "email",
		name: "name",
		phone: "999999",
		password: "password",
	};

	it("should fail if findByEmail in landlordRepository throws an exception", async () => {
		const { sut, landlordRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateLandlordGeneralError);
	});

	it("should fail if findByEmail in tenantRepository throws an exception", async () => {
		const { sut, tenantRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockImplementationOnce(() => {
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
		expect(result.value).toEqual(EmailNotAvailable);
	});

	it("should fail if generateHash throws an exception", async () => {
		const { sut, cryptServiceStub, landlordRepositoryStub, tenantRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(cryptServiceStub, "generateHash").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateLandlordGeneralError);
	});

	it("should calls generateHash with correct input", async () => {
		const { sut, landlordRepositoryStub, cryptServiceStub, tenantRepositoryStub } = makeCreateLandlordSut();
		const spy = jest.spyOn(cryptServiceStub, "generateHash");

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.password);
	});

	it("should return left if landlordEntity returns left", async () => {
		const { sut, landlordRepositoryStub, tenantRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(LandlordEntity, "create").mockReturnValueOnce(left(fakeIError));

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(fakeIError);
	});

	it("should fail if landlord creation throws an exception", async () => {
		const { sut, landlordRepositoryStub, tenantRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(landlordRepositoryStub, "create").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateLandlordGeneralError);
	});

	it("should create a landlord on success", async () => {
		const { sut, landlordRepositoryStub, tenantRepositoryStub } = makeCreateLandlordSut();

		jest.spyOn(landlordRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			...fakeLandlordEntity,
			password: undefined,
		});
	});
});
