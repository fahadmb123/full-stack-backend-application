import { Request,Response,NextFunction } from "express";



const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
    res.status(500).json({
        success: false,
        message: err.message
    })
}

export default errorMiddleware