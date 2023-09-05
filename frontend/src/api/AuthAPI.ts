import { api } from './api';

export const AuthAPI = {
    signup: async function (email: string, password: string) {
        const response = await api.post<any>('/auth/signup', {
            email,
            password,
        });
        return response.data;
    },
    login: async function (email: string, password: string) {
        const response = await api.post<any>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },
    logout: async function () {
        const response = await api.delete<any>('/auth/logout');
        return response.data;
    },
    resend: async function () {
        const response = await api.get<any>('/auth/resend');
        return response.data;
    },
    getUser: async function () {
        const response = await api.get<any>('/auth/user');
        return response.data;
    },
    verify: async function (token: string) {
        const response = await api.post<any>(`/auth/verify/${token}`);
        return response.data;
    },
};