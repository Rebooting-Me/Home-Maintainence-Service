import React, {useState, useEffect} from 'react'
import styles from './Profile.module.css'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import {profileHolder} from '../../../../constants/profileHolder'

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
        (<div>
            <div className={styles.profileHeaderWrapper}>
            <div className={styles.profileImageWrapper}>
                <img src={state?.profile?.profile_image?(require(`${state.profile.profile_image}`)):(require(`../../../../assets/contractor/${profileHolder.profile_image}`))} alt=''/>
            </div>
            <div className={styles.profileInfo}>
                    <div className={styles.profileName}>
                        <h2>{state?.profile?.profile_name?(state.profile.profile_name):(profileHolder.profile_name)}</h2>
                    </div>
                    <div className={styles.profileAddress}>
                        <p>{state?.profile?.city? (state.profile.city) : (profileHolder.city)}</p>
                        <p>{state?.profile?.state? (state.profile.state) : (profileHolder.state)}</p>
                        <p>{state?.profile?.zip? (state.profile.zip) : (profileHolder.zip)}</p>
                    </div>
                    <div className={styles.profileWeb}>
                        <a href={state?.profile?.website? (state.profile.website) : (profileHolder.website)}>{profileHolder.website}</a>
                    </div>
                    <div className={styles.profilePhone}>
                        <p>{state?.profile?.phone? (state.profile.phone) : (profileHolder.phone)}</p>
                    </div>
                </div>
            </div>
            <div className={styles.editButtonWrapper}>
                <button>Edit</button>
            </div>
            <div className={styles.profileContentWrapper}>
                <div className={styles.profileDescription}>
                    <h3>About this contractor</h3>
                    <p>{state?.profile?.description? (state.profile.description) : (profileHolder.description)}</p>
                </div>
                <div className={styles.profileServices}>
                    <h3>Services offered</h3>
                    {(state?.profile?.services? ((state.profile.services.map((service)=>{
                        const imgsvg = require(`../../../../assets/${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>{service}</p>
                            </div>
                        );
                    }))) : (profileHolder.services.map((service)=>{
                        const imgsvg = require(`../../../../assets/${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>
                                    {service.toLowerCase()
                                    .split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                                </p>
                            </div>
                        );
                    })))}
                </div>
            </div>
        </div>)}
    </div>
  )
}

export default Profile