import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const api = axios.create({ baseURL: api_url });

api.interceptors.request.use((config) => {
  if (!config.headers.Authorization)
    config.headers.Authorization = `Bearer ${api_key}`;

  return config;
});

export { api };
