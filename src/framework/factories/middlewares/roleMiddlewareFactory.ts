import { RoleMiddleware } from "@framework/server/middlewares/role";

export const makeRoleMiddleware = (): RoleMiddleware => {
	return new RoleMiddleware();
};
