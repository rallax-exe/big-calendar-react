import axios from 'axios';
import { getEnvVariables } from '../helpers';


//Axios obtiene la URL de la API

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create ({

    baseURL: VITE_API_URL

});

//Configurar interceptores


export default calendarApi;