// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nina-showroom.vercel.app', // URL del backend
  withCredentials: true, // Para enviar cookies con cada solicitud si es necesario
});

export default instance;

//https://nina-showroom.vercel.app
