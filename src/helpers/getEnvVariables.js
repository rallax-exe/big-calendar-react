

export const getEnvVariables = () => {

    //VITE aun no soluciona el problema de importacion de ENV
    //import.meta.env;

    return{
        //Importa de manera manual la variable de entorno
        //Si tenemos varias variables se necesita importar una por una
        VITE_API_URL: import.meta.env.VITE_API_URL, 
        
        //...import.meta.env

    }

}