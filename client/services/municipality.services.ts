import axios from 'axios';
import { handleError, handleSucess } from '../utils/handler';

const { API_URL } = process.env;
const setMunicipalityData = async (formData: any) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
    };
    console.log(formData);
    try {
        const { data } = await axios.post('/api/municiple', formData, { headers });
        if (data) {
            return data;
        }
    } catch (error) {
        return handleError(error);
    }
};

const getMunicipalityData = async () => {
    try {
        const { data } = await axios.get('/api/municiple');
        if (data.message === 'Admin exists') {
            return true;
        }
            return false;
    } catch (error) {
        return handleError(error);
    }
};

export default { setMunicipalityData, getMunicipalityData };
