import { IUserPartialed } from "./IUser";

export interface IUserService <T>{
    register (user:IUserPartialed):Promise<IServiceReturn<T>>
}


export interface IServiceReturn<T> {
    success:boolean,
    message:string,
    data:T
}