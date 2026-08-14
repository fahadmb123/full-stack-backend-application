import { Request,Response,NextFunction } from "express";
import { AppError } from "../errors/AppError";



const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {

    if (err instanceof AppError){
        res.status(err.statusCode).json({
            success:false,
            message:err.message
        })
        return 
    }
    res.status(500).json({
        success: false,
        message: err.message
    })
}

export default errorMiddleware