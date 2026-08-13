type UserType = "admin" | "user"


export interface IUser {
    id:string,
    name:string,
    email:string,
    password:string,
    role:UserType
}

export interface IRegisterUser extends Omit<IUser, "role" | "id"> {
    role?: UserType,
    id?:string
}