import { NextFunction,Response,Request } from "express";
import { IUserService } from "../interfaces/IUserService";



export class UserController {

    constructor(private userService:IUserService) {}

    register = async (req: Request,res: Response,next: NextFunction): Promise<void> =>{
        try {            
            await this.userService.register(req.body);

            res.status(201).json({
                success : true,
                message: "User registered successfully"
            });
        } catch (error) {
            console.log(error)
        }
    }
}