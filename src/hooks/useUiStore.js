/*

    Controla todo lo 
    relacionado con el 
    ui en el store

*/

import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';


export const useUiStore = () => {

    //Inicia una instancia para usar Dispatch
    const dispatch = useDispatch();

    //Obtiene la propiedad de state del ui
    const { 
        isDateModalOpen
    } = useSelector( state => state.ui );


    const openDateModal = () => {

        //Despacha la accion en el slice
        dispatch( onOpenDateModal() );

    }

    const closeDateModal = () => {

        //Despacha la accion en el slice
        dispatch( onCloseDateModal() );

    }


    return {
        //Properties
        isDateModalOpen,


        //Metodos
        openDateModal,
        closeDateModal,

    }

}