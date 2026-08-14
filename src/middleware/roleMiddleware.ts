import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const roleMiddleware = (allowedRoles: string[]) => {

    return (req: Request,res: Response,next: NextFunction): void => {
        try {
            if (!req.user) throw new AppError(401,"Authentication required")

            if (!allowedRoles.includes(req.user.role)) throw new AppError(403,"Access denied") 

            next()
        } catch (error) {
            next(error)
        }
    }
}