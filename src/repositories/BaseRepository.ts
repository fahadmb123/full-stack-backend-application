
export abstract class BaseRepository <T>{
    abstract create(data:T):Promise<boolean>
}