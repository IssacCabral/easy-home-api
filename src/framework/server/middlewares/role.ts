import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import { forbidden, ok, unauthorized } from "@controllers/protocols/httpStatus";
import type { IMiddleware } from "@controllers/protocols/iMiddleware";
import { AuthorizationGeneralError, ForbiddenError } from "./errors";

export enum Roles {
	TENANT = "tenant",
	LANDLORD = "landlord",
}

export class RoleMiddleware implements IMiddleware {
	async handle(httpRequest: HttpRequest, role?: Roles): Promise<HttpResponse> {
		const authenticatedUser = httpRequest.user;
		if (!authenticatedUser) {
			return unauthorized(AuthorizationGeneralError);
		}

		let hasPermission = false;

		switch (role) {
			case Roles.TENANT:
				hasPermission = !authenticatedUser.isLandlord;
				break;
			case Roles.LANDLORD:
				hasPermission = authenticatedUser.isLandlord;
				break;
			default:
				hasPermission = false;
		}

		return hasPermission ? ok({}) : forbidden(ForbiddenError);
	}
}
