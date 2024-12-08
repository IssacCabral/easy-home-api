import { LoginController } from "@controllers/components/auth/loginController";
import { makeLoginOperator } from "../../operators/auth/loginOperatorFactory";

export const makeLoginController = (): LoginController => {
	return new LoginController(makeLoginOperator());
};
