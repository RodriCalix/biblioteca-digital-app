/**
 * ============================================================================
 * ARCHIVO: services/api.ts
 * DESCRIPCIÓN: Cliente HTTP centralizado basado en Axios.
 * Configura la instancia principal con la URL base de MockAPI, timeout global,
 * cabeceras JSON e interceptores de depuración para solicitudes y respuestas.
 * ============================================================================
 */
import axios from 'axios';
import { APP_CONFIG } from '@/constants/config';

/**
 * Instancia preconfigurada de Axios para interactuar con la API REST de MockAPI.
 * Utiliza los valores de baseURL y timeout definidos en la configuración central.
 */
export const api = axios.create({
  baseURL: APP_CONFIG.API_BASE_URL,
  timeout: APP_CONFIG.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de Solicitudes (Request Interceptor):
 * Se ejecuta antes de que cada petición salga hacia el servidor.
 * Registra en consola el método HTTP y la ruta para facilitar el monitoreo en desarrollo.
 */
api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Respuestas (Response Interceptor):
 * Se ejecuta al recibir la respuesta del servidor o al ocurrir un fallo en la conexión.
 * Registra códigos de estado exitosos o detalles del error para depuración.
 */
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Response ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('[API] Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

