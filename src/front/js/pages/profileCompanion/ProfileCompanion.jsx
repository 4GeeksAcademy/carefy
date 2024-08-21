import React, {useEffect, useContext} from 'react'
import { CompanionProfile } from '../../component/companionProfile/CompanionProfile.jsx'
import styles from './profileCompanion.module.css'
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";


const ProfileCompanion = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
 
  useEffect(() => {
    
    actions.companion(id);
  
}, []);

  return (
    <div>
      <div className={styles.main_container}>
      <CompanionProfile/>
    </div>
    </div>
  )
}

export default ProfileCompanion
