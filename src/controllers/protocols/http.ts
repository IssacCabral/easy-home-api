import type { IUser } from "@business/dtos/user/getUserByTokenDto";
import type { Serializable } from "@shared/iError";

export type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;

type QueryParams = {
	[key: string]: undefined | string | string[] | QueryParams | QueryParams[];
};

export type HttpRequest = {
	body?: object;
	params?: Record<string, string>;
	query?: QueryParams;
	user?: IUser;
	headers?: {
		authorization?: string;
	};
};

export type HttpResponse = {
	statusCode: StatusCode;
	body: Serializable;
};
