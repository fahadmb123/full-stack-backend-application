import { IUserPartialed } from "./IUser";

export interface IUserService <>{
    register (user:IUserPartialed):Promise<IServiceReturn<IUserPartialed>>
    login (user:IUserPartialed):Promise<IServiceReturn<string>>
}


export interface IServiceReturn<T> {
    success:boolean,
    message:string,
    data:T
}