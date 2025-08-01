import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'https://stack-api-service.vercel.app',
});

export default clienteAxios;
