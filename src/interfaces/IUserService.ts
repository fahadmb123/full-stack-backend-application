export interface IUserService {
    register <T>(user:T):Promise<void>
}