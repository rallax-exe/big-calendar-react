
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //Obtiene la propiedad de state del ui
    const {
        events,
        activeEvent
    } = useSelector(state => state.calendar);

    //Obtiene la propuedad del state del auth
    const {
        user
    } = useSelector(state => state.auth);

    //Envia en las props el evento activo
    const setActiveEvent = (calendarEvent) => {

        //Despacha la accion con el argumento del evento activo
        dispatch(onSetActiveEvent(calendarEvent));

    }

    //Esto funciona como un Thunk
    const startSavingEvent = async (calendarEvent) => {
        //lLegar al backend 

        try {

            //Si calendar tiene el id
            if (calendarEvent.id) {

                //Actualizando, manda la data del calendarEvent para actualizar el evento en backend
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                //Con el spred rompe la referencia y crea un nuevo objeto, agrega user al props
                dispatch(onUpdateEvent({ ...calendarEvent, user }));

                return;

            }

            //Creando 
            //Recuerda que el token ya estan en el header de la peticion

            //Se envia el evento al backend
            const { data } = await calendarApi.post('/events', calendarEvent);

            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {

            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

        }


    }

    const sartDeletingEvent = async () => {

        //lLegar al backend 

        try {

            await calendarApi.delete(`/events/${activeEvent.id}`);
            //Si todo sale bien
            dispatch(onDeleteEvent());
            
        } catch (error) {

            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');

        }

    }

    const startLoadingEvents = async () => {

        try {

            //Obtiene los eventos del backend
            const { data } = await calendarApi.get('/events');

            //Convierte las fechas en fechas de javascript
            //Obitnen los eventos convertidos
            const events = convertEventsToDateEvents(data.eventos);

            //Despacha la accion de cargar los eventos en el state
            dispatch(onLoadEvents(events));



        } catch (error) {

            console.log('Error cargando eventos');
            console.log(error)

        }

    }


    return {

        //Properties
        events,
        activeEvent,
        //Si activeEvent es null regresa falso
        //si tiene un objeto y un id, regresa true
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        sartDeletingEvent,
        startLoadingEvents,


    }
}



