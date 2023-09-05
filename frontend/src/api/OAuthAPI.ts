import { api } from './api';

export const OAuthAPI = {
    authorize: async function (email: string, password: string) {
        const response = await api.post<any>('/auth/signup', {
            email,
            password,
        });
        return response.data;
    },
};