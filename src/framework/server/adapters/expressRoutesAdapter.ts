import type { HttpRequest, HttpResponse } from "@controllers/protocols/http";
import type { IController } from "@controllers/protocols/iController";
import type { Request, Response } from "express";

export class ExpressRoutesAdapter {
	static adapt(controller: IController) {
		return async (request: Request, response: Response) => {
			const httpRequest: HttpRequest = {
				body: request.body,
				params: request.params,
				query: request.query,
			};

			const httpResponse: HttpResponse = await controller.handle(httpRequest);
			const statusCode = httpResponse.statusCode;

			return response.status(statusCode).json(httpResponse.body);
		};
	}
}
