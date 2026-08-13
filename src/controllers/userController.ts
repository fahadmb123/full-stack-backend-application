import { NextFunction,Response,Request } from "express";
import { IUserService } from "../interfaces/IUserService";



export class UserController {

    constructor(private userService:IUserService) {}

    register = async (req: Request,res: Response,next: NextFunction): Promise<void> =>{
        try {
            //const user = 
            
            await this.userService.register(req.body);

            res.status(201).json({
                message: "User registered successfully",
                //user
            });
        } catch (error) {
            next(error);
        }
    }
}