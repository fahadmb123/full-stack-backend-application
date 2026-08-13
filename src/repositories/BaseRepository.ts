import { IUser } from "../interfaces/IUser";

export abstract class BaseRepository <T>{
    create():Promise<T>
}