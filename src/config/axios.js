import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://stack-api-service.vercel.app';

const clienteAxios = axios.create({
  baseURL,
});

// reqres.in sirve sus avatares con `Cross-Origin-Resource-Policy: same-origin`, por lo que el
// navegador bloquea cargarlos directamente desde el frontend. Los servimos a través de nuestro
// propio backend (ver /api/usuarios/avatar) para evitar ese bloqueo.
export const getAvatarUrl = avatar => {
  if (!avatar) {
    return null;
  }
  return `${baseURL.replace(/\/$/, '')}/api/usuarios/avatar?url=${encodeURIComponent(avatar)}`;
};

export default clienteAxios;
