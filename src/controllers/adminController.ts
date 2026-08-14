import { NextFunction, Request, Response} from "express";
import { IAdminService } from "../interfaces/Admin/IAdminService";

export class AdminController {
    constructor (private adminService : IAdminService){}

    getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = await this.adminService.getAllUsers()
            res.status(200).json(result)
        }catch (err) {
            next(err)
        }
    }
}