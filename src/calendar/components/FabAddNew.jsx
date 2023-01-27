import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';



export const FabAddNew = () => {

    //Metodo del custo hook para abrir el modal
    const { openDateModal } = useUiStore();

    const { setActiveEvent } = useCalendarStore();
    
    //Al hacer click en el boton abre el modal
    const handleClickNew = () => {
        
        //Limpia el evento activo
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
              _id: '123',
              name: 'Raul',
            }
        });
        openDateModal();

    };


  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
