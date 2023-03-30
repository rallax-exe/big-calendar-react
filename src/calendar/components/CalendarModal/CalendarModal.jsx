import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

import { useCalendarStore, useUiStore } from '../../../hooks';





registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {


    //Obtiene la propiedad del state por el custom hook
    const { isDateModalOpen, closeDateModal } = useUiStore();

    //Toma la prop de custom hook con el evento activo
    const { activeEvent, startSavingEvent } = useCalendarStore();

    //Para controlar el envio del formulario
    const [formSubmited, setFormSubmited] = useState(false);

    
    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    //Memoriza el valor si el titulo o el formSubmited cambia
    const titleClass = useMemo(() => {

        //Si el form no se ha disparado
        if (!formSubmited) return '';

        /*
            Si ya se hizo el posteo y el usuario
            y el titulo esta vacio
            Regresa is-invalid para la clase de bootstrap
        */
        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmited]);


    //Se dispara cada vez que la nota cambia
    useEffect(() => {
      
        if (activeEvent !== null ){

            /*
                Exparse las propiedades y crea un nuevo objeto
                Para que el modal obtenga el evento activo
            */
            setFormValues({...activeEvent});

        }
        
    
    }, [activeEvent]);
    

    /* Esto es para el formualario */
    const onInputChanged = ({ target }) => {
        setFormValues({
            /* Mantiene todo el contenido del formValues */
            ...formValues,
            /*Solo edita el campo que se esta editando (target)*/
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {

        setFormValues({
            /* Mantiene todo el contenido del formValues */
            ...formValues,
            /*Edita el campo start o end del useState*/
            [changing]: event
        })

    }


    //Cierra el modal 
    const onCloseModal = () => {

        closeDateModal();

    };


    //Envio del formulario
    const onSubmit = async(event) => {

        //Evita que se recarge la pagina
        event.preventDefault();
        //El usuario intento postear el formulario
        setFormSubmited(true);

        //Diferencia entre la fecha fin y la fecha de inicio en segundos
        const difference = differenceInSeconds(formValues.end, formValues.start);

        //Si la fecha es NaN o la diferencia es menor a 0 finaliza
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        //Si el titulo es menor a 0 finaliza 
        if (formValues.title.length <= 0) return;

        //Envia el evento al custom hook
        await startSavingEvent( formValues );
        //Cierra el modal
        closeDateModal();

        setFormSubmited(false);

    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
