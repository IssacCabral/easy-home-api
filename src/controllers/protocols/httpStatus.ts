import type { IError, Serializable } from "@shared/iError";
import type { HttpResponse } from "./http";

export const serverError = (error: Serializable): HttpResponse => ({
	statusCode: 500,
	body: error,
});

export const badRequest = (error: IError): HttpResponse => ({
	statusCode: 400,
	body: error,
});

export const created = (data: Serializable): HttpResponse => ({
	statusCode: 201,
	body: data,
});

export const ok = (data: Serializable): HttpResponse => ({
	statusCode: 200,
	body: data,
});

export const noContent = (): HttpResponse => {
	return {
		statusCode: 204,
		body: {},
	};
};

export const unauthorized = (error: IError): HttpResponse => {
	return {
		statusCode: 401,
		body: error,
	};
};

export const notFound = (error: IError): HttpResponse => {
	return {
		statusCode: 404,
		body: error,
	};
};

export const forbidden = (error: IError): HttpResponse => {
	return {
		statusCode: 403,
		body: error,
	};
};
