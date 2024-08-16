import React from 'react'
import { CompanionProfile } from '../../component/companionProfile/CompanionProfile.jsx'
import styles from './profileCompanion.module.css'

const ProfileCompanion = () => {
  return (
    <div>
      <div className={styles.main_container}>
      <CompanionProfile/>
    </div>
    </div>
  )
}

export default ProfileCompanion
