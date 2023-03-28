
/*
    Es importante el orde de estas exportaciones 
    se aconseja que exportemos el store al final
    de todos los Slice, de esta forma previene 
    errores al cargar los reducer
*/

export * from './auth/authSlice';
export * from './ui/uiSlice';
export * from './calendar/calendarSlice';

export * from './store';