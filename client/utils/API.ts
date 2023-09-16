/* eslint-disable linebreak-style */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = BASE_URL;

export const API = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
  user: {
    // to create or update or get user (post, put, get)
    users: '/api/user',
    // to edit user role
    userRole: '/api/role',
    // post request to create admin
    createAdmin: '/api/user/create-admin',
    // check if admin or not get request
    checkAdmin: '/api/user/check-admin',
    // update admin
    updateAdmin: '/api/user/update-admin',
  },
  municipality: {
    // post, get and put municipality profile
    profile: '/api/municiple',
  },
  section: {
    // Post ward in wardName parameter
    ward: '/api/ward',
     // post department in department name in paramter
    department: '/api/department',
    // post request to category
    category: '/api/category',
    // to create darta-chalani
    darta: '/api/darta',
    chalani: '/api/chalani',
    // to create template
    template: '/api/template',
  },
  sewagrahi: {
    create: '/api/sewagrahi',
  },
};
