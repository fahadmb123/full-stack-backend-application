import jwt from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/IJwt";

export const generateToken = (userId: number, role: string): string => {

    return jwt.sign(
        {userId,role}
        ,process.env.JWT_SECRET!,
        { expiresIn: "7d"}
    )
}


export const verifyToken = (token: string): IJwtPayload => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET!
    ) as IJwtPayload;
};