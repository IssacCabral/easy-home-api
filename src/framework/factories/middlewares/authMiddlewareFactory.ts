import { AuthMiddleware } from "@framework/server/middlewares/auth";
import { makeGetUserByTokenUseCase } from "../usecases/user/getUserByTokenUseCaseFactory";

export const makeAuthMiddleware = (): AuthMiddleware => {
	const getUserByTokenUseCase = makeGetUserByTokenUseCase();
	return new AuthMiddleware(getUserByTokenUseCase);
};
