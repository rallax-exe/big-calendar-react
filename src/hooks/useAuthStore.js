import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';

export const useAuthStore = () =>{

    //Usamos los reducers del slice de auth
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    //Metodo para iniciar sesion
    const startLogin = async({ email, password }) => {
        
        console.log({email, password});

        //Envia la data al backend
        try {
            
            //Realiza el posteo al backend con la data
            const resp = await calendarApi.post('/auth', {email, password});
            console.log({ resp });

        } catch (error) {
            
            console.log({ error });

        }

    }


    return {

        //Propiedades
        errorMessage,
        status,
        user,


        //Metodos

        startLogin

    }


}