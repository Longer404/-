const TOKEN_STORAGE_KEY = '_tt';
const ADMIN_TOKEN = 'ad_tt';

export const getToken = () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
};

export const setToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);

    return token;
};

export const getAdminToken = () => {
    return localStorage.getItem(ADMIN_TOKEN) || '';
};

export const setAdminToken = (token) => {
    localStorage.setItem(ADMIN_TOKEN, token);

    return token;
};