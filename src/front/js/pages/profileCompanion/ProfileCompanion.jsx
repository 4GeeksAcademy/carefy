import React, {useEffect, useContext} from 'react'
import { CompanionProfile } from '../../component/companionProfile/CompanionProfile.jsx'
import styles from './profileCompanion.module.css'
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router-dom";


const ProfileCompanion = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.userData.token) {
      navigate('/login');
    }
  }, [store.userData.token, navigate])

 
 
  return (
    <div>
      <div className={styles.main_container}>
      <CompanionProfile/>
    </div>
    </div>
  )
}

export default ProfileCompanion
