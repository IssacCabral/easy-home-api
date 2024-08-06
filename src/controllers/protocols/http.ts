import type { Serializable } from "@shared/iError";

export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;

export type HttpRequest = {
	body: object;
	params?: object;
	query?: object;
	headers?: {
		authorization?: string;
	};
};

export type HttpResponse = {
	statusCode: StatusCode;
	body: Serializable;
};
