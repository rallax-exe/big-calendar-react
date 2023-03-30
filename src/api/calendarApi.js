import axios from 'axios';
import { getEnvVariables } from '../helpers';


//Axios obtiene la URL de la API

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create ({

    baseURL: VITE_API_URL

});

//Interceptores
//Este actua en un request tambien se puede en response
calendarApi.interceptors.request.use( config => {


    config.headers = {
        //Por si tienes mas headers, con spred los mantiene
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    //Regresa la configuracion modificada
    return config;

})



export default calendarApi;