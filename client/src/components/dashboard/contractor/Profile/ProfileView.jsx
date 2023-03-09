import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './Profile.module.css'
import {profileHolder} from '../../../../constants/profileHolder'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const ProfileView = (props) => {
    const { onClickEdit } = props;
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});


    useEffect(()=>{
        const getProfile = async () => {
            setIsLoading(true);
            const response = await fetch('api/contractor/profile', {
                headers:{'Authorization': `Bearer ${user.token}`}
            });

            const json = await response.json();
            console.log(user.token);
            console.log(json);
            setProfile({...json});
            setIsLoading(false);
        };
        getProfile()
    }, []);

  return (
    <div className={styles.profileWrapper}>
        {isLoading ? (<div className={styles.isLoading}>Loading</div>) : 
        (
        <div>
            <div className={styles.profileHeaderWrapper}>
            {/* <div className={styles.profileImageWrapper}>
                <img src={profile?.profile_image?(require(`${profile.profile_image}`)):(require(`../../../../assets/contractor/${profileHolder.profile_image}`))} alt=''/>
            </div> */}
            <div className={styles.profileInfo}>
                    <div className={styles.profileName}>
                        <h2>{profile?.profile_name?(profile.profile_name):(profileHolder.profile_name)}</h2>
                    </div>
                    <div className={styles.profileAddress}>
                        <p>{profile?.city? (profile.city) : (profileHolder.city)}</p>
                        <p>{profile?.state? (profile.state) : (profileHolder.state)}</p>
                        <p>{profile?.zip_code? (profile.zip_code) : (profileHolder.zip_code)}</p>
                    </div>
                    <div className={styles.profileWeb}>
                        <a href={profile?.website_url? (profile.website_url) : (profileHolder.website_url)}>
                            {profile?.website_url? (profile.website_url) : (profileHolder.website_url)}</a>
                    </div>
                    <div className={styles.profilePhone}>
                        <p>{profile?.phone_number? (profile.phone_number) : (profileHolder.phone_number)}</p>
                    </div>
                </div>
            </div>
            <div className={styles.editButtonWrapper}>
                <button onClick={onClickEdit}>Edit</button>
            </div>
            <div className={styles.profileContentWrapper}>
                <div className={styles.profileDescription}>
                    <h3>About this contractor</h3>
                    <p>{profile?.description? (profile.description) : (profileHolder.description)}</p>
                </div>
                <div className={styles.profileServices}>
                    <h3>Services offered</h3>
                    <div className={styles.profileServiceCards}>
                    {(profile?.services? ((profile.services?.map((service)=>{
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
                                    .split('_')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                                </p>
                            </div>
                        );
                    })))}
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ProfileView