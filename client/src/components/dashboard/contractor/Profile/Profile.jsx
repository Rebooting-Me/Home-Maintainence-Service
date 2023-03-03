import React, {useState, useEffect} from 'react'
import styles from './Profile.module.css'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import ProfileView from './ProfileView'
import ProfileEdit from './ProfileEdit'

const Profile = () => {
    const { user } = useAuthContext();
    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(()=>{
        const getProfile = async () => {
            setIsLoading(true);
            const profile = await fetch('api/contractor/profile', {
                headers:{'Authorization': `Bearer ${user.token}`}
            });
            console.log(user.token);
            console.log(profile);
            setState({...profile});
            setIsLoading(false);
        };
        getProfile()
    }, []);

  return (
    <div className={styles.profileWrapper}>
        {isLoading ? (<div>Loading</div>) : 
        (isEdit ? 
        (<ProfileEdit 
            onClickView = {() => setIsEdit(false)} 
            profile = {state.profile}
            />) : 
        (<ProfileView
            onClickEdit = {() => setIsEdit(true)} 
            profile = {state.profile}
        />))}
    </div>
  )
}

export default Profile