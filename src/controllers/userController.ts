import { NextFunction,Response,Request } from "express";
import { IUserService } from "../interfaces/IUserService";
import { IUserPartialed } from "../interfaces/IUser";



export class UserController {

    constructor(private userService:IUserService<IUserPartialed>) {}

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
            await this.userService.register(req.body);

            res.status(201).json({
                success : true,
                message: "User registered successfully"
            });
        } catch (error) {
            next(error)
        }
    }
}