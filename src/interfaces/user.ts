
export interface IUser {
    email: string;
    password: string;
    fullname: string;
    image: string;
    role: "user" | "admin"
}