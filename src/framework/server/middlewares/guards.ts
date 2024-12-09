import { makeRoleMiddleware } from "@framework/factories/middlewares/roleMiddlewareFactory";
import { ExpressMiddlewareAdapter } from "../adapters/expressMiddlewareAdapter";
import { Roles } from "./role";

const roleMiddleware = makeRoleMiddleware();

export const landlordGuard = ExpressMiddlewareAdapter.adapt(roleMiddleware, Roles.LANDLORD);
export const tenantGuard = ExpressMiddlewareAdapter.adapt(roleMiddleware, Roles.TENANT);
