import type { HttpRequest } from "@controllers/protocols/http";
import type { IMiddleware } from "@controllers/protocols/iMiddleware";
import type { NextFunction, Request, Response } from "express";

export class ExpressMiddlewareAdapter {
	static adapt(middleware: IMiddleware) {
		return async (request: Request, response: Response, next: NextFunction) => {
			const httpRequest: HttpRequest = {
				...(request.headers && {
					headers: {
						authorization: request.headers.authorization,
					},
				}),
				...(request.user && {
					user: request.user,
				}),
			};

			const httpResponse = await middleware.handle(httpRequest, undefined);

			if (httpResponse.statusCode === 200) {
				if (httpResponse.body !== null) {
					Object.assign(request, httpResponse.body);
					next();
				} else {
					next();
				}
			} else {
				return response.status(httpResponse.statusCode).json(httpResponse.body);
			}
		};
	}
}
