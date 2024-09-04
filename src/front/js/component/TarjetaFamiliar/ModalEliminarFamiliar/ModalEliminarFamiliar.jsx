import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../../../store/appContext.js";
import styles from "../../BloqueAnuncio/BloqueAnuncio.module.css";


export const ModalEliminarFamiliar = ({ familiar }) => {

    const { store, actions } = useContext(Context);
    const [error, setError] = useState('')

    const eliminar_familiar = async () => {
        const result = await actions.eliminar_familiar(familiar.id)

        if (result) {
            // Maneja el éxito de la edición aquí
            navigate('/perfilusuario');
        } else {
            setError("Ocurrió un error al editar los datos.");
        }
    }

    // Sincronizar los valores iniciales del objeto `familiar` con los estados locales
    useEffect(() => {
        if (familiar) {
            store.familiar
        }
    }, [familiar]); // Se vuelve a ejecutar cada vez que `familiar` cambie



    return (
        <div className="modal-content">
            <div className="modal-body fw-bold fs-4">
                ¿Desea retirar a este familiar?
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                <button type="button" className="btn btn-danger fs-5" data-bs-dismiss="modal" onClick={() => eliminar_familiar()}>Retirar</button>
            </div>
        </div>
    )
}