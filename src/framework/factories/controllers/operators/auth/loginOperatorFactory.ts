import { LoginOperator } from "@controllers/operators/auth/loginOperator";
import { makeLoginUseCase } from "@framework/factories/usecases/auth/loginUseCaseFactory";

export const makeLoginOperator = (): LoginOperator => {
	return new LoginOperator(makeLoginUseCase());
};
