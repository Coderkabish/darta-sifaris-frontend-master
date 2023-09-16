import axios from 'axios';
import { handleError } from '../utils/handler';

const addWard = async (
    wardName: string) => {
    try {
        const data = await axios.post(`/api/ward?wardName=${wardName}`);
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {

    }
};

const listWards = async () => {
    try {
        const data = await axios.get('/api/ward');
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {

    }
};

const addDepartment = async (
    departmentName: string) => {
    try {
        const data = await axios.post(`/api/department?departmentName=${departmentName}`);
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {

    }
};

const listDepartment = async () => {
    try {
        const data = await axios.get('/api/department');
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {

    }
};

const addCategory = async ({ formData }) => {
    try {
        const data = await axios.post('/api/category', formData);
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {
        handleError(err);
    }
};

// eslint-disable-next-line consistent-return
const listCategory = async () => {
    try {
        const data = await axios.get('/api/category');
        // Router.push(redirect);
        if (data.data) {
            return data;
        }
            return data;
    } catch (err: any) {

    }
};

const addTemplate = async ({ formData }: {
    formData: {
        name: string, template: string, format: JSON, category: number
    }
// eslint-disable-next-line consistent-return
}) => {
    try {
        console.log(formData);
        const data = await axios.post('/api/template', formData);
        // Router.push(redirect);
        if (data) {
            return data;
        }
    } catch (err: any) {
        console.log(err);
    }
};

// eslint-disable-next-line consistent-return
const getTemplates = async () => {
    try {
        const data = await axios.get('/api/template?ward=true');
        if (data) {
            return data;
        }
    } catch (err: any) {
        return handleError(err);
    }
};

export default { addWard, listWards, addDepartment, listDepartment, addCategory, listCategory, addTemplate, getTemplates };
