import { makeLoginController } from "@framework/factories/controllers/components/auth/loginControllerFactory";
import { ExpressRoutesAdapter } from "@framework/server/adapters/expressRoutesAdapter";
import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/auth/login", ExpressRoutesAdapter.adapt(makeLoginController()));
