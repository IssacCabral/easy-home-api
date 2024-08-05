import type { IError } from "@shared/error";
import type { HttpResponse } from "./http";

export const serverError = (error: IError): HttpResponse => ({
	statusCode: 500,
	body: error,
});

export const badRequest = (error: IError): HttpResponse => ({
	statusCode: 400,
	body: error,
});

export const created = (data: object): HttpResponse => ({
	statusCode: 201,
	body: data,
});

export const ok = (data: object): HttpResponse => ({
	statusCode: 200,
	body: data,
});

export const noContent = (data: object): HttpResponse => {
	return {
		statusCode: 204,
		body: data,
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
