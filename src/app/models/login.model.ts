export interface LoginModel {
    userName: string,
    password: string
}

export interface LoginResponse {
    message: string;
    token: string;
    usuario: {
        id: number;
        email: string;
        rol: string;
    };
}