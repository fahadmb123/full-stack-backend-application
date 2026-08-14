type UserRoleTypes = "admin" | "user"


export interface IUser {
    id:string,
    name:string,
    email:string,
    password:string,
    role:UserRoleTypes
}

export type IUserPartialed  = Partial<IUser>
