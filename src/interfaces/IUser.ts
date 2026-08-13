type UserType = "admin" | "user"


export interface IUser {
    name:string,
    email:string,
    password:string,
    role:UserType
}

export interface IRegisterUser extends Omit<IUser, "role"> {
    role?: UserType;
}