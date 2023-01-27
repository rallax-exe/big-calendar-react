import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useCalendarStore, useUiStore } from '../../hooks';



export const CalendarPage = () => {

  //Usamos el metodo del custom hook
  const { openDateModal } = useUiStore();

  //Usamos la prop y el metodo del custom hook
  const { events, setActiveEvent } = useCalendarStore(); 

  //state que almacena el ultimo visto, si no hay uno visto, por defecto es week
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  //Funcion para hacer funcionar el calendario
  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }

  }

  //Al hacer doble click en un evento
  const onDoubleClick = (event) => {

    //console.log({ doubleClick: event });
    //Ejecuta el metodo del custo hook
    openDateModal();

  }

  /*
    - Al hacer click en un evento -
      No confundir el event con el de Javascript
      Este event trae un evento creado por
      React Big Calendar
  */
  const onSelect = (event) => {

    //Activa el evento, con el metodo del custom hook
    setActiveEvent( event );

  }

  //Guarda en el local storage el ultimo visto
  const onViewChanged = (event) => {

    localStorage.setItem('lastView', event);
    setLastView(event);

  }


  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
