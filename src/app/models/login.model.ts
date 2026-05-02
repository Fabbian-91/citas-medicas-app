export interface LoginModel {
    userName: string,
    password: string
}

export interface LoginResponse {
    token: string;
    usuario: {
        id: number;
        nombre: string;
        email: string;
        rol: string;
    };
}