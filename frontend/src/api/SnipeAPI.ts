import { api } from './api';

export const SnipeAPI = {
    get: async function () {
        const response = await api.get<any>('/snipe/');
        return response.data;
    },
    post: async function (data: any) {
        const response = await api.post<any>('/snipe/', data);
        return response.data;
    },
    delete: async function (id: string) {
        const response = await api.delete<any>(`/snipe/${id}`);
        return response.data;
    },
    put: async function (id: string, data: any) {
        const response = await api.put<any>(`/snipe/${id}`, data);
        return response.data;
    }
};