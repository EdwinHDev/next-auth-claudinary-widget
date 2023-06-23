export type IRole = "user" | "admin";

export interface IUser {
    email: string;
    password: string;
    fullname: string;
    image: string;
    role: IRole;
}