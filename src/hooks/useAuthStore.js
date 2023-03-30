import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store';

export const useAuthStore = () =>{

    //Usamos los reducers del slice de auth
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    //Metodo para iniciar sesion
    const startLogin = async({ email, password }) => {
        
        //Despacha la accion al authSlice
        dispatch( onChecking );

        //Envia la data al backend
        try {
            
            //Realiza el posteo al backend con la data
            const { data } = await calendarApi.post('/auth', {email, password});
            //Guarda en el local storage el token del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            //Si todo sale bien despacha el inicio de sesion
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            //Si hay error despacha la accion cerrar sesion
            dispatch( onLogout( 'Credenciales incorrectas' ) );
            
            //Limpia el mensaje de error a los 10ms
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);

        }

    }


    const startRegister = async({ name, email, password }) => {
        
        //Despacha la accion al authSlice
        dispatch( onChecking );

        //Envia la data al backend
        try {
            
            //Realiza el posteo al backend con la data
            const { data } = await calendarApi.post('/auth/new', {name, email, password});
            //Guarda en el local storage el token del usuario
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            //Si todo sale bien despacha el inicio de sesion
            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            //Si hay error despacha la accion cerrar sesion, data? = si hay data entonces algo
            dispatch( onLogout(error.response.data?.msg || '--') );
            
            //Limpia el mensaje de error a los 10ms
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);

        }

    }

    const checkAuthToken = async() => {

        /*
            El checkAuthToken, verifica que el token sea vigente, el
            proceso de verificacion lo hace el backend, si hay 
            error al verificarlo (vencio o no existe) manda error y
            se cierra la sesion
        */

        //Obtiene el token del local Storage
        const token = localStorage.getItem('token');

        //Finaliza si no hay token
        if ( !token ) return dispatch(onLogout());

        try {
            
            //Verifica y renueva el token en el backend
           const { data } = await calendarApi.get('/auth/renew');

           //Guarda en el local storage el token del usuario
           localStorage.setItem('token', data.token);
           localStorage.setItem('token-init-date', new Date().getTime());

           //Si todo sale bien despacha el inicio de sesion
           dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            //Error en caso de que ya expiro el token o no existe

            //Limapia el local storage en caso de error y cierra sesion
            localStorage.clear();
            dispatch(onLogout());

        }

    }

    const startLogout = () => {

        localStorage.clear();
        //Limpia el state de los eventos
        dispatch( onLogoutCalendar() );
        //Despacha la accion para cerrar sesion
        dispatch( onLogout() );

    }


    return {

        //Propiedades
        errorMessage,
        status,
        user,


        //Metodos

        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,

    }


}