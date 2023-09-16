import axios from 'axios';
import Router from 'next/router';

import { handleError, handleSucess } from '../utils/handler';

const { API_URL } = process.env;
const getSuperUser = async () => {
    try {
        const { data } = await axios.get('/api/user/check-admin');
        if (data.message === 'Admin exists') {
            return true;
        }
            return false;
    } catch (error) {
        return handleError(error);
    }
};

const login = async ({
                         username,
                         password,
                     }: {
    username: string;
    password: string;
}) => {
    try {
        const formData = {
            username,
            password,
        };
        const data = await axios.post('/api/auth/login', formData);
        // Router.push(redirect);
        console.log(formData);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {
        return handleError(err);
    }
};

const register = async ({
                            formData,
                        }: {
    formData: {
        username: string,
        email: string, password: string, name: string
    };
}) => {
    try {
        const { data } = await axios.post('/api/user/create-admin', formData);
        return data;
        return handleSucess(data);
    } catch (err: any) {
        console.log(err);
        return handleError(err);
    }
};

const forgetPassword = async ({ email }: { email: string }) => {
    try {
        const formData = {
            email,
        };

        const { data } = await axios.post(`${API_URL}/forget-password`, formData);

        return handleSucess(data);
    } catch (err: any) {
        return handleError(err);
    }
};

const resetPassword = async ({
                                 token,
                                 password,
                                 userId,
                             }: {
    token: string;
    password: string;
    userId: string;
}) => {
    try {
        const formData = {
            token,
            password,
            userId,
        };

        const { data } = await axios.post(`${API_URL}/reset-password`, formData);

        Router.push('/login');

        return handleSucess(data);
    } catch (err: any) {
        return handleError(err);
    }
};

const isLoggedIn = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/is-logged-in`);

        return data?.data;
    } catch (err: any) {
        return handleError(err);
    }
};

const checkAdmin = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/user/check-admin`);
        console.log(data);
        return data;
    } catch (err: any) {
        return handleError(err);
    }
};

// eslint-disable-next-line consistent-return
const logout = async () => {
    try {
        const { data } = await axios.get('/api/auth/logout');
        if (data.message === 'Logout Successfull') {
            return handleSucess(data);
        }
    } catch (err: any) {
        return handleError(err);
    }
};

const getUser = async () => {
    try {
        const { data } = await axios.get('/api/user/me');
        return data.data;
    } catch (err: any) {
        return handleError(err);
    }
};



const exportedObject = {
    login,
    register,
    forgetPassword,
    resetPassword,
    isLoggedIn,
    logout,
    getSuperUser,
    getUser,
};

export default exportedObject;
