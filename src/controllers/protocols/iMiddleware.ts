import type { HttpRequest, HttpResponse } from "./http";

export interface IMiddleware<T = undefined> {
	handle(httpRequest: HttpRequest, ...options: T extends undefined ? [undefined] : [T]): Promise<HttpResponse>;
}
