
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';


//Crea instancias para el formulario

const loginFormFields = {

    loginEmail:     '',
    loginPassword:  '',

}

const registerFormFields = {

    registerName:         '',
    registerEmail:        '',
    registerPassword:     '',
    registerPassword2:    '',

}

export const LoginPage = () => {

    //Inicia la sesion
    const { startLogin, startRegister, errorMessage } = useAuthStore();

    //Crea la instancia del login para el formulario
    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit = ( event ) => {

        event.preventDefault();
        //Envia a Axios los datos del usuario
        startLogin({ email: loginEmail, password: loginPassword });

    }

    const registerSubmit = ( event ) => {

        event.preventDefault();

        //Mensaje de error si las contrasenias no coinciden
        if( registerPassword !== registerPassword2 ) {
            
            Swal.fire('Error en registro', 'Las contraseñas no coinciden', 'error');
            return;

        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });

    }

    //Se ejecuta cada vez que errorMessage cambia
    useEffect(() => {

      //Si es diferente a undefined se ejecuta el mensaje de SweetAlert
      if( errorMessage !== undefined ){

        Swal.fire('Error en la autenticacion', errorMessage, 'error');

      }
    
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}