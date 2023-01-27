
import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //Obtiene la propiedad de state del ui
    const {
        events,
        activeEvent
    } = useSelector(state => state.calendar);

    //Envia en las props el evento activo
    const setActiveEvent = ( calendarEvent ) => {
        
        //Despacha la accion con el argumento del evento activo
        dispatch( onSetActiveEvent( calendarEvent ) );

    }
    
    //Esto funciona como un Thunk
    const startSavingEvent = async( calendarEvent ) => {
        //lLegar al backend 

        //Si calendar tiene el id
        if( calendarEvent._id ) {
            
            //Actualizando
            //Con el spred rompe la referencia y crea un nuevo objeto
            dispatch( onUpdateEvent( {...calendarEvent} ) );

            
        } else {
            //Creando 
            dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime()} ) );

        }

    }

    const sartDeletingEvent = () => {

        //Llegar al backend

        //Si todo sale bien
        dispatch( onDeleteEvent() );

    }


    return {

        //Properties
        events,
        activeEvent,
            //Si activeEvent es null regresa falso
            //si tiene un objeto y un id, regresa true
        hasEventSelected: !!activeEvent?._id,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        sartDeletingEvent,


    }
}



