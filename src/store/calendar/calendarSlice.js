import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

/*
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
*/

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {

        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null,

    },

    reducers: {

        onSetActiveEvent: (state, { payload }) => {

            state.activeEvent = payload;

        },

        onAddNewEvent: (state, { payload }) => {

            state.events.push(payload);
            state.activeEvent = null;

        },

        onUpdateEvent: (state, { payload }) => {

            //Hace una mutacion al array para regresar actualizado el evento
            //Recorre y regresa cada uno de los elementos del array
            state.events = state.events.map(event => {

                if (event.id === payload.id) {

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

        onDeleteEvent: (state) => {

            //Si el evento activo existe
            if (state.activeEvent) {
                //Regresa todos los eventos que sean diferentes a la nota activa
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },

        onLoadEvents: (state, { payload = [] }) => {

            state.isLoadingEvents = false;
            payload.forEach(event => {

                //Busca si existe el evento regresa un true usando some
                /*
                    dbEvent es un evento de base de datos
                    si el elemento NO concide con el id que estamos
                    recibiendo en el payload, lo GUARDA en el arreglo
                    de eventos
                */
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event);
                }

            });

        },

        onLogoutCalendar: (state) => {

            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;

        }

    }
});


// Action creators are generated for each case reducer function
export const {

    onAddNewEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent,
    onUpdateEvent,

} = calendarSlice.actions;