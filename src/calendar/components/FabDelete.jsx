
import { useCalendarStore } from '../../hooks';



export const FabDelete = () => {

    
    

    const { sartDeletingEvent, hasEventSelected } = useCalendarStore();
    
    
    //Al hacer click borra el evento
    const handleDelete = () => {
      
      sartDeletingEvent();
      
    };

    


  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
          //display: (hasEventSelected && !isDateModalOpen) ? '' : 'none'
          display: (hasEventSelected) ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
