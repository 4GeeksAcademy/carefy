import React, { useEffect, useContext } from 'react';
import styles from './listModerate.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

const ListModerate = ({ }) => {

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (!store.userData.token) {
      navigate('/login');
    }
  }, [store.userData.token, navigate])


  useEffect(() => {
    actions.getAds();
  }, []);

  const verAnuncio = (id) => {
    navigate(`/anuncio/${id}`)
    window.scrollTo(0, 0);
  }

  const handleStatusChange = async (id, newStatus) => {
    console.log("Sending data to server:", { id, status: newStatus });

    try {
      await actions.editAdStatus(id, newStatus);
    } catch (error) {
      console.error('Error updating ad status:', error);
    }
  };

  const handleDelete = async (id) => {
    await actions.deleteAd(id);
    actions.getAds();
  }

  return (
    <div className={`container bg-light p-4 my-5 rounded ${styles.list_moderate}`}>
      <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-pendientes-tab" data-bs-toggle="pill" data-bs-target="#pills-pendientes" type="button" role="tab" aria-controls="pills-pendientes" aria-selected="true">Pendientes de revisión</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`btn fs-5 ${styles.button_tab}`} id="pills-publicados-tab" data-bs-toggle="pill" data-bs-target="#pills-publicados" type="button" role="tab" aria-controls="pills-publicados" aria-selected="false">Publicados</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`btn fs-5 ${styles.button_tab}`} id="pills-rechazados-tab" data-bs-toggle="pill" data-bs-target="#pills-rechazados" type="button" role="tab" aria-controls="pills-rechazados" aria-selected="false">Rechazados</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`btn fs-5 ${styles.button_tab}`} id="pills-finalizados-tab" data-bs-toggle="pill" data-bs-target="#pills-finalizados" type="button" role="tab" aria-controls="pills-finalizados" aria-selected="false">Finalizados</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">


        <div className="tab-pane fade show active table-responsive" id="pills-pendientes" role="tabpanel" aria-labelledby="pills-pendientes-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(store.ads) && store.ads.length > 0 ? (
                store.ads.filter(ad => ad.status === "pending")
                  .map((ad, index) => {
                    if (!ad || !ad.id) {
                      return null; // Si `ad` o `ad.id` no existen, no se renderiza la fila
                    }

                    return (
                      <tr key={ad.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{ad.title}</td>
                        <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</td>
                        <select
                          value={ad.status}
                          onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                          className="form-select"
                        >
                          <option className={styles.pendiente} value="pending">Pendiente</option>
                          <option className='text-success' value="ok">Publicado</option>
                          <option className='text-danger' value="rejected">Rechazado</option>
                          <option className='text-secondary' value="finish">Finalizado</option>
                        </select>
                        <td className="text-end">
                          <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                          <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${ad.id}`}></span>


                          <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${ad.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${ad.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="text-start modal-body fw-bold fs-4">
                                  ¿Desea eliminar el anuncio?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                  <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="5">No hay anuncios por moderar</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        <div className="tab-pane fade table-responsive" id="pills-publicados" role="tabpanel" aria-labelledby="pills-publicados-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(store.ads) && store.ads.length > 0 ? (
                store.ads.filter(ad => ad.status == "ok")
                  .map((ad, index) => {
                    if (!ad || !ad.id) {
                      return null; // Si `ad` o `ad.id` no existen, no se renderiza la fila
                    }

                    return (
                      <tr key={ad.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{ad.title}</td>
                        <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</td>
                        <select
                          value={ad.status}
                          onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                          className="form-select"
                        >
                          <option className={styles.pendiente} value="pending">Pendiente</option>
                          <option className='text-success' value="ok">Publicado</option>
                          <option className='text-danger' value="rejected">Rechazado</option>
                          <option className='text-secondary' value="finish">Finalizado</option>
                        </select>
                        <td className="text-end">
                          <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                          <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${ad.id}`}></span>


                          <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${ad.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${ad.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="text-start modal-body fw-bold fs-4">
                                  ¿Desea eliminar el anuncio?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                  <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="5">No hay anuncios</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade table-responsive" id="pills-rechazados" role="tabpanel" aria-labelledby="pills-rechazados-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(store.ads) && store.ads.length > 0 ? (
                store.ads.filter(ad => ad.status === "rejected")
                  .map((ad, index) => {
                    if (!ad || !ad.id) {
                      return null; // Si `ad` o `ad.id` no existen, no se renderiza la fila
                    }

                    return (
                      <tr key={ad.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{ad.title}</td>
                        <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</td>
                        <select
                          value={ad.status}
                          onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                          className="form-select"
                        >
                          <option className={styles.pendiente} value="pending">Pendiente</option>
                          <option className='text-success' value="ok">Publicado</option>
                          <option className='text-danger' value="rejected">Rechazado</option>
                          <option className='text-secondary' value="finish">Finalizado</option>
                        </select>
                        <td className="text-end">
                          <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                          <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${ad.id}`}></span>


                          <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${ad.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${ad.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="text-start modal-body fw-bold fs-4">
                                  ¿Desea eliminar el anuncio?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                  <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="5">No hay anuncios por moderar</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
     
        <div className="tab-pane fade table-responsive" id="pills-finalizados" role="tabpanel" aria-labelledby="pills-finalizados-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(store.ads) && store.ads.length > 0 ? (
                store.ads.filter(ad => ad.status === "finish")
                  .map((ad, index) => {
                    if (!ad || !ad.id) {
                      return null; // Si `ad` o `ad.id` no existen, no se renderiza la fila
                    }

                    return (
                      <tr key={ad.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{ad.title}</td>
                        <td>{new Date(ad.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}</td>
                        <select
                          value={ad.status}
                          onChange={(e) => handleStatusChange(ad.id, e.target.value)}
                          className="form-select"
                        >
                          <option className={styles.pendiente} value="pending">Pendiente</option>
                          <option className='text-success' value="ok">Publicado</option>
                          <option className='text-danger' value="rejected">Rechazado</option>
                          <option className='text-secondary' value="finish">Finalizado</option>
                        </select>
                        <td className="text-end">
                          <span onClick={() => verAnuncio(ad.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                          <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${ad.id}`}></span>


                          <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${ad.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${ad.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="text-start modal-body fw-bold fs-4">
                                  ¿Desea eliminar el anuncio?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                  <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(ad.id)}>Eliminar</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="5">No hay anuncios por moderar</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

     </div>
    </div>
  );
}

export default ListModerate;
