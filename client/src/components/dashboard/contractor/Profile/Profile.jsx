import React, {useState, useEffect} from 'react'
import styles from './Profile.module.css'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const Profile = () => {
    const { user } = useAuthContext();
    const [state, setState] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const getProfile = async () => {
            setIsLoading(true);
            const profile = await fetch('api/contractor/profile', {
                headers:{'Authorization': `Bearer ${user.token}`}
            });
            setState({...profile});
            setIsLoading(false);
        };
        console.log(user);
        getProfile()
    }, []);

  return (
    <div className={styles.profileWrapper}>
        {isLoading ? (<div>Loading</div>) : 
        (<div>
            <div className={styles.profileHeaderWrapper}>
            <div className={styles.profileImageWrapper}>
                <img src={state?.profile?.profile_image} alt=''/>
            </div>
                <div className={styles.profileInfo}>
                    <div className={styles.profileName}>
                        <h2>{state?.profile?.profile_name}</h2>
                    </div>
                    <div className={styles.profileAddress}>
                        <p>{state?.profile?.city}</p>
                        <p>{state?.profile?.state}</p>
                        <p>{state?.profile?.zip}</p>
                    </div>
                    <div className={styles.profileWeb}>
                        <a href={state?.profile?.website}></a>
                    </div>
                    <div className={styles.profilePhone}>
                        <p>{state?.profile?.phone}</p>
                    </div>
                </div>
            </div>
            <div className={styles.editButtonWrapper}>
                <button>Edit</button>
            </div>
            <div className={styles.profileContentWrapper}>
                <div className={styles.profileDescription}>
                    <h3>About this contractor</h3>
                    <p>{state?.profile?.description}</p>
                </div>
                <div className={styles.profileServices}>
                    <h3>Services offered</h3>
                    {(state?.profile?.services.map(({service})=>{
                        const imgsvg = require(`../../../${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>{service}</p>
                            </div>
                        );
                    }))}
                </div>
            </div>
        </div>)}
    </div>
  )
}

export default Profile