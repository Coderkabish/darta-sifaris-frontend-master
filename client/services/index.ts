import axios from 'axios';
import MunicipalService from './municipality.services';
import AuthService from './auth.service';
import TemplateService from './template.service';

axios.defaults.withCredentials = true;
axios.defaults.params = {};
export {
    AuthService,
    MunicipalService,
    TemplateService,
};
