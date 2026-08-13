import { NextFunction,Response,Request } from "express";



export class UserController {

    constructor() {}

    async register(req: Request,res: Response,next: NextFunction): Promise<void> {
        try {
            //const user = await this.userService.register(req.body);

            res.status(201).json({
                message: "User registered successfully",
                //user
            });
        } catch (error) {
            next(error);
        }
    }
}