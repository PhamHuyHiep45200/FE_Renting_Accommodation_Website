export interface IUSer {
    username?: string;
    phone: string;
    role: boolean;
    address?: string;
    avatar?: string;
}

export interface IAuthSlide {
    auth: boolean,
    user: IUSer | null
}