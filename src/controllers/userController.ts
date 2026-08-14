import { NextFunction,Response,Request } from "express";
import { IUserService } from "../interfaces/IUserService";
import { IUserPartialed } from "../interfaces/IUser";



export class UserController {

    constructor(private userService:IUserService) {}

    register = async (req: Request,res: Response,next: NextFunction): Promise<void> =>{
        try {            
            const result = await this.userService.register(req.body);

            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request,res: Response,next: NextFunction): Promise<void> =>{
        try {            
            const result = await this.userService.login(req.body)

            res.cookie("token", result.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
}