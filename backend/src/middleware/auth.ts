import { Request, Response, NextFunction } from "express";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-api-key"];
  const secret = process.env.API_SECRET_KEY;
  if (!secret || key !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
