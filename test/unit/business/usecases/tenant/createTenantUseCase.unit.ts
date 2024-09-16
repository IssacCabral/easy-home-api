import type { InputCreateTenantDto } from "@business/dtos/tenant/createTenantDto";
import { CreateTenantGeneralError, TenantAlreadyExists } from "@business/errors/tenant";
import { TenantEntity } from "@entities/components/tenant/tenant";
import { left } from "@shared/either";
import { fakeIError } from "@test/utility/fakes/error";
import { fakeTenantEntity } from "@test/utility/fakes/tenantEntity";
import { makeCreateTenantSut } from "@test/utility/suts/tenant/createTenantSut";

describe("CreateTenantUseCase", () => {
	const input: InputCreateTenantDto = {
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

	it("should calls findByEmail with correct input", async () => {
		const { sut, tenantRepositoryStub } = makeCreateTenantSut();
		const spy = jest.spyOn(tenantRepositoryStub, "findByEmail");

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.email);
	});

	it("should return left if tenant already exists", async () => {
		const { sut } = makeCreateTenantSut();
		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(TenantAlreadyExists);
	});

	it("should fail if generateHash throws an exception", async () => {
		const { sut, cryptServiceStub, tenantRepositoryStub } = makeCreateTenantSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(cryptServiceStub, "generateHash").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateTenantGeneralError);
	});

	it("should calls generateHash with correct input", async () => {
		const { sut, tenantRepositoryStub, cryptServiceStub } = makeCreateTenantSut();
		const spy = jest.spyOn(cryptServiceStub, "generateHash");

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		await sut.exec(input);

		expect(spy).toHaveBeenCalledWith(input.password);
	});

	it("should return left if tenantEntity returns left", async () => {
		const { sut, tenantRepositoryStub } = makeCreateTenantSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(TenantEntity, "create").mockReturnValueOnce(left(fakeIError));

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeTruthy();
		expect(result.isRight()).toBeFalsy();
		expect(result.value).toEqual(fakeIError);
	});

	it("should fail if tenant creation throws an exception", async () => {
		const { sut, tenantRepositoryStub } = makeCreateTenantSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);
		jest.spyOn(tenantRepositoryStub, "create").mockImplementationOnce(() => {
			throw new Error("error");
		});

		const result = await sut.exec(input);

		expect(result.isRight()).toBeFalsy();
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(CreateTenantGeneralError);
	});

	it("should create a tenant on success", async () => {
		const { sut, tenantRepositoryStub } = makeCreateTenantSut();

		jest.spyOn(tenantRepositoryStub, "findByEmail").mockResolvedValueOnce(null);

		const result = await sut.exec(input);

		expect(result.isLeft()).toBeFalsy();
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual({
			...fakeTenantEntity,
			password: undefined,
		});
	});
});
