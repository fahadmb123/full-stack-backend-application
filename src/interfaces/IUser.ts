type UserRoleTypes = "admin" | "user"


export interface IUser {
    id:string,
    name:string,
    email:string,
    password:string,
    role:UserRoleTypes
}

export interface IRegisterUser extends Omit<IUser, "role" | "id"> {
    role?: UserRoleTypes,
    id?:string
}