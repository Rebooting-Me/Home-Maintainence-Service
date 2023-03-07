import React, {useState} from 'react'
import styles from './Profile.module.css'
import ProfileView from './ProfileView'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
    const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={styles.profileWrapper}>
        { 
        (isEdit ? 
        (<ProfileEdit 
            onClickView = {() => setIsEdit(false)} 
            />) : 
        (<ProfileView
            onClickEdit = {() => setIsEdit(true)} 
        />))}
    </div>
  )
}

export default Profile