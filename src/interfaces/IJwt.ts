export interface IJwtPayload {
    userId: number;
    role: "user" | "admin";
}