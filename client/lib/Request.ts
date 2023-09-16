import axios from 'axios';

export const get = async (endpoint: string) => {
  const res = await axios.get(endpoint);
  return res.data;
};

export const post = async (endpoint: string, payload: any, access_token: string | undefined) => {
  const res = await axios.post(endpoint, payload, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const remove = async (endpoint: string) => {
  const res = await axios.delete(endpoint);
  return res.data;
};
