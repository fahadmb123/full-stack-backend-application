import { NextFunction,Response,Request } from "express";
import { IUserService } from "../interfaces/User/IUserService";



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
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    profile = async (req: Request,res: Response,next: NextFunction): Promise<void> =>{
        res.send("This is Profileeeee  ")
    }
}