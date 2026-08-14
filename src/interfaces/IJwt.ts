export interface IJwtPayload {
    userId: number;
    role: "user" | "admin";
}



declare global {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}