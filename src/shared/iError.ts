export type Serializable = string | number | boolean | object | Serializable[];

export interface IError {
	code: string;
	message: string;
	shortMessage: string;
	details: Serializable;
}
