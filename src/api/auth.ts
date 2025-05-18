import {axiosAuthInstance} from "./axios";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        roles: {
            id: number;
            name: string;
            showName: string;
        }[];
        nombre: string;
        grupos: any[];
    }
}

export const loginUsuario = async (
    datos: LoginRequest
): Promise<LoginResponse> => {
    const response = await axiosAuthInstance.post<LoginResponse>('/login', datos);
    console.log('LA RESPONSE AL HACER LOGIN', response.data);
    return response.data;
}