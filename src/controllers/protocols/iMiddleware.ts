import type { Roles } from "@framework/server/middlewares/role";
import type { HttpRequest, HttpResponse } from "./http";

export interface IMiddleware {
	handle(httpRequest: HttpRequest, role?: Roles): Promise<HttpResponse>;
}
