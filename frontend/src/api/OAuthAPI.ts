import { api } from './api';

interface Redirect {
    url: string;
}

export const OAuthAPI = {
    authorizeEbay: async function () {
        const response = await api.post<Redirect>('/oauth/authorize/ebay');
        return response.data;
    },
};