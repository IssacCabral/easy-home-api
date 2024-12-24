import type { LoginUseCase } from "@business/usecases/auth/loginUseCase";
import type { InputLoginSerializer, OutputLoginSerializer } from "@controllers/serializers/auth/loginSerializer";
import { AbstractOperator } from "../abstractOperator";

export class LoginOperator extends AbstractOperator<InputLoginSerializer, OutputLoginSerializer> {
	constructor(private readonly loginUseCase: LoginUseCase) {
		super();
	}

	protected async run(input: InputLoginSerializer): Promise<OutputLoginSerializer> {
		return this.loginUseCase.exec(input);
	}
}
