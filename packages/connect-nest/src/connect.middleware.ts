import type { NextFunction, Request, Response } from "express";

import { ConnectStore } from "./connect.store";
import { expressConnectMiddleware } from "@connectrpc/connect-express";

export function nestConnectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const routes = ConnectStore.routes;

  expressConnectMiddleware({
    routes,
  })(req, res, next);
}
