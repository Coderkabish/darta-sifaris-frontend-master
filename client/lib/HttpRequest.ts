/* eslint-disable linebreak-style */
import axios from 'axios';

export class HttpRequest {
    static get = (endpoint: string, token?: string, config: {} = {}) => {
        const defaultConfig = {
            ...config,
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
            },
            withCredentials: true,
        };
        return axios.get(endpoint, defaultConfig);
    };

    static post = (endpoint: string, payload: any, token?: string, multipart: boolean = false) => {
        const config = {
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
                ...(multipart && { 'content-type': 'multipart/form-data' }),
            },
        };
        return axios.post(endpoint, payload, config);
    };

    static put = (endpoint: string, payload: any, token?: string, multipart: boolean = false) => {
        const config = {
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
                ...(multipart && { 'content-type': 'multipart/form-data' }),
            },
        };
        return axios.put(endpoint, payload, config);
    };

    static patch = (endpoint: string, payload: any, token?: string, multipart: boolean = false) => {
        const config = {
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
                ...(multipart && { 'content-type': 'multipart/form-data' }),
            },
        };
        return axios.patch(endpoint, payload, config);
    };

    static delete = (endpoint: string, token?: string, config: {} = {}) => {
        const defaultConfig = {
            ...config,
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
            },
        };
        return axios.delete(endpoint, defaultConfig);
    };
}

export const fetcher = (url: string, token?: string) =>
    axios
        .get(url, {
            headers: {
                ...(token && { authorization: `Bearer ${token}` }),
            },
        })
        .then((res) => res.data);
