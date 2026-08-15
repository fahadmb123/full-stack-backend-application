import { NextFunction, Request, Response} from "express";
import { IAdminService } from "../interfaces/Admin/IAdminService";
import { success } from "zod";

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

    updateUser = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const id = req.params.id
            const result = await this.adminService.update(Number(id),req.body)
            res.status(200).json(result)
        }catch (err) {
            next(err)
        }
    }

    createUser = async (req:Request,res:Response,next:NextFunction)=>{
        try {            
            const result = await this.adminService.createUser(req.body)
            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    getUser = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const id = req.params.id     
            const result = await this.adminService.getUser(Number(id))
            res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }

    deleteUser = async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const id = req.params.id     
            await this.adminService.deleteUser(Number(id))
            res.status(201).json({
                success : true,
                message : "User Deleted"
            });
        } catch (error) {
            next(error)
        }
    }
}