import type { IUser } from "@business/dtos/user/getUserByTokenDto";

declare global {
	namespace Express {
		interface Request {
			user: IUser;
		}
	}
}
