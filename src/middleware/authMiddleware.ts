import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request,res: Response,next: NextFunction): void => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            })
            return
        }
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
        return
    }
}

export const guestMiddleware = (req: Request,res: Response,next: NextFunction): void => {
    try {
        const token = req.cookies.token
        if (!token) {
            next()
            return
        }
        verifyToken(token)
        res.status(409).json({
            success: false,
            message: "You are already logged in"
        })
        return
    } catch (error) {
        next(error);
    }
};