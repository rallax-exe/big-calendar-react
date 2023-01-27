import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Un evento importante',
    notes: 'Hay que comprar algo',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Raul',
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {

        events: [
            tempEvent
        ],
        activeEvent: null,

    },

    reducers: {
        
        onSetActiveEvent: ( state, { payload } ) => {

            state.activeEvent = payload;

        },

        onAddNewEvent: ( state, { payload } ) => {

            state.events.push( payload );
            state.activeEvent = null; 

        },

        onUpdateEvent: ( state, {payload} ) => {

            //Hace una mutacion al array para regresar actualizado el evento
            //Recorre y regresa cada uno de los elementos del array
            state.events = state.events.map( event => {

                if( event._id === payload._id ) {

                    /*
                        Si el id que viene en el payload
                        es igual a un evento que esta en 
                        el arreglo, retorna el evento
                        del payload que sustituye al 
                        evento anterior
                    */
                    return payload;

                }
                //Regresa el evento completo para hacer el push
                return event;
            });

        },

        onDeleteEvent: ( state ) => {

            //Si el evento activo existe
            if ( state.activeEvent ){
                //Regresa todos los eventos que sean diferentes a la nota activa
                state.events = state.events.filter( event => event._id !== state.activeEvent._id );
                state.activeEvent = null;
            }
        },

    }
});


// Action creators are generated for each case reducer function
export const { 
    
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent, 
    onUpdateEvent,

} = calendarSlice.actions;