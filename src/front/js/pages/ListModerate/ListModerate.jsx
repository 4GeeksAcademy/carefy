import React from 'react';
import styles from './listModerate.module.css';

const ListModerate = ({name, lastName, title, created_at, status}) => {

  /*variable de prueba adData
  const adData = [    {
      id: 1,
      title: 'Busco un cuidador nocturno',
      name: 'Juan',
      lastName: 'Pérez',
      created_at: '2024-08-12',
      status: 'pending_review'
    },
    {
      id: 2,
      title: 'Necesito apoyo en labores de la casa',
      name: 'Ana',
      lastName: 'Gómez',
      created_at: '2024-08-11',
      status: 'approved'
    }];*/

  // Filtrado de los datos en función del estado, ejemplo si tuvieramos una variable llamada adData
  // const pendingReviewAds = adData.filter(ad => ad.status === 'pending_review');
  //const reviewedAds = adData.filter(ad => ad.status !== 'pending_review');

  return (
    <div className={`container bg-light p-4 my-5 rounded ${styles.list_moderate}`}>
      <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-postulaciones-tab" data-bs-toggle="pill" data-bs-target="#pills-postulaciones" type="button" role="tab" aria-controls="pills-postulaciones" aria-selected="true">Pendientes de revisión</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`btn fs-5 ${styles.button_tab}`} id="pills-fav-tab" data-bs-toggle="pill" data-bs-target="#pills-fav" type="button" role="tab" aria-controls="pills-fav" aria-selected="false">Revisados</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">


        {/* Pestaña de Pendientes de Revisión */}
        <div className="tab-pane fade show active table-responsive" id="pills-postulaciones" role="tabpanel" aria-labelledby="pills-postulaciones-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col">Ver completo</th>
              </tr>
            </thead>
            <tbody>


             {/*{pendingReviewAds.map((ad) => (          aquí hacemos el mapeo de los datos ya filtrados */} 
            
                  <td>{name}</td>
                  <td>{lastName}</td>
                  <td>{title}</td>
                  <td>{created_at}</td>
                  <td>{status}</td>
                  <td>
                    <button className={`btn btn-info ${styles.btn_more}`}>
                      Ver más
                    </button>
                  </td>
                
             {/*  ))}   Aquí termina el primer mapeo de los anuncios pendientes de revisión  */ }


            </tbody>
          </table>
        </div>
        {/* Pestaña de Revisados */}
        <div className="tab-pane fade table-responsive" id="pills-fav" role="tabpanel" aria-labelledby="pills-fav-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Título</th>
                <th scope="col">Fecha creación</th>
                <th scope="col">Estado</th>
                <th scope="col">Ver completo</th>
              </tr>
            </thead>
            <tbody>
               {/*{pendingReviewAds.map((ad) => (          aquí hacemos el mapeo de los datos ya filtrados */} 
               
                  <td>{name}</td>
                  <td>{lastName}</td>
                  <td>{title}</td>
                  <td>{created_at}</td>
                  <td>{status}</td>
                  <td>
                  <button className={`btn btn-info ${styles.btn_more}`}>
                      Ver más
                    </button>
                  </td>
              
              {/*  ))}   Aquí termina el mapeo de los anuncios ya revisados */ }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListModerate;
