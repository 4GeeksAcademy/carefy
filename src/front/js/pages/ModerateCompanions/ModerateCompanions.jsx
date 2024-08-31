import React, { useEffect, useContext } from 'react';
import styles from './ModerateCompanions.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

const ModerateCompanions = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.userData.token) {
          navigate('/login');
        }
      }, [store.userData.token, navigate])


  useEffect(() => {
    actions.getCompanions();
  }, []);

  const verPerfil = (id) => {
    navigate(`/perfil-profesional/${id}`)
    window.scrollTo(0, 0);
  }

  const handleDelete = async (id) => {
    await actions.deleteCompanion(id);
    actions.getCompanions();
  }

  const getAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);///
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

  return (
    <div className={`container bg-light p-4 my-5 rounded ${styles.list_moderate}`}>
      <ul className={`nav nav-pills ${styles.nav_pills_edit} mb-3`} id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className={`btn active fs-5 ${styles.button_tab}`} id="pills-profiles-tab" data-bs-toggle="pill" data-bs-target="#pills-profiles" type="button" role="tab" aria-controls="pills-profiles" aria-selected="true">Perfiles</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">

        <div className="tab-pane fade show active table-responsive" id="pills-profiles" role="tabpanel" aria-labelledby="pills-profiles-tab" tabIndex="0">
          <table className="table table-light table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Ubicación</th>
                <th scope="col">Edad</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(store.companions) && store.companions.length > 0 ? (
                store.companions.map((profile, index) => {
                    if (!profile || !profile.id) {
                      return null;
                    }

                    return (
                      <tr key={profile.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{profile.user?.name} {profile.user.lastname}</td>
                        <td>{profile.user?.location}, {profile.province}</td>
                        <td>{getAge(profile?.birthdate)} años</td>
                 
                        <td className="text-end">
                          <span onClick={() => verPerfil(profile.id)} className={`fa-solid fa-eye pe-3 ${styles.ad_icons}`}></span>

                          <span className={`fa-solid fa-trash-can pb-2 ${styles.ad_icons}`} type="button" data-bs-toggle="modal" data-bs-target={`#deleteModal-${profile.id}`}></span>


                          <div className={`modal fade ${styles.modal_edit}`} data-bs-backdrop="false" id={`deleteModal-${profile.id}`} tabIndex="-1" aria-labelledby={`deleteModalLabel-${profile.id}`} aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="text-start modal-body fw-bold fs-4">
                                  ¿Desea eliminar el perfil?
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary fs-5" data-bs-dismiss="modal">Volver</button>
                                  <button type="button" className="btn btn-danger fs-5" onClick={() => handleDelete(profile.id)}>Eliminar</button>
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
                  <td colSpan="5">No hay perfiles por moderar</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
     
     </div>
    </div>
  );
}

export default ModerateCompanions;
