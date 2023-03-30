import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';


export const AppRouter = () => {

    //const authStatus = 'not-authenticated'; //'not-authenticated';

    //Se obtiene las props y metodos
    const { status, checkAuthToken } = useAuthStore();

    //Si cambia checkAuthToken, es otra manera de escribirlo
    /*
      Este useEffect se dispara cada vez que el usuario 
      cambia de ruta, si entra al calendario o esta en el login

      El checkAuthToken, verifica que el token sea vigente, el
      proceso de verificacion lo hace el backend, si hay 
      error al verificarlo (vencio o no existe) manda error y
      se cierra la sesion
    */
    useEffect(() => {

      checkAuthToken();

    }, [])
    
    
    if (status === 'checking') {

      return(
        <h3>Cargando...</h3>
      )

    }


    return (
      
      <Routes>
            { 
                ( status === "not-authenticated" ) 
                ? (
                    <>
                      <Route path="/auth/*" element={ <LoginPage /> } />
                      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                    </>                    
                  )
                : (
                    <>
                      <Route path="/" element={ <CalendarPage /> } />
                      <Route path="/*" element={ <Navigate to="/" /> } />
                    </>
                  )
            }     

            
      </Routes>

  )
}
