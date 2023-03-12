import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './ContractorStandAlone.module.css'
// import {profileHolder} from '../../../../constants/profileHolder'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const ContractorStandAlone = (props) => {
    const { contractorId, setContractorId } = props;
    const {user} = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});


    useEffect(()=>{
        const getProfile = async () => {
            setIsLoading(true);
            const response = await fetch('api/homeowner/contractor/'+ contractorId, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }
            );

            const json = await response.json();
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
            <button onClick={() => {setContractorId(null)}} className={styles.goBackButton}>&#60; View all contractors</button>
            <div className={styles.profileHeaderWrapper}>
            {/* <div className={styles.profileImageWrapper}>
                <img src={profile?.profile_image?(require(`${profile.profile_image}`)):(require(`../../../../assets/contractor/${profileHolder.profile_image}`))} alt=''/>
            </div> */}
            <div className={styles.profileInfo}>
                    <div className={styles.profileName}>
                        <h2>{profile?.profile_name?(profile.profile_name):('')}</h2>
                    </div>
                    <div className={styles.profileAddress}>
                        <p>{profile?.city? (profile.city) : ('')}</p>
                        <p>{profile?.state? (profile.state) : ('')}</p>
                        <p>{profile?.zip_code? (profile.zip_code) : ('')}</p>
                    </div>
                    <div className={styles.profileWeb}>
                        <a href={profile?.website_url? (profile.website_url) : ('')}>
                            {profile?.website_url? (profile.website_url) : ('')}</a>
                    </div>
                    <div className={styles.profilePhone}>
                        <p>{profile?.phone_number? (profile.phone_number) : ('')}</p>
                    </div>
                </div>
            </div>
            <div className={styles.profileContentWrapper}>
                <div className={styles.profileDescription}>
                    <h3>About this contractor</h3>
                    <p>{profile?.description? (profile.description) : ('')}</p>
                </div>
                <div className={styles.profileServices}>
                    <h3>Services offered</h3>
                    <div className={styles.profileServiceCards}>
                    {(profile?.services? ((profile.services?.map((service)=>{
                        const imgsvg = require(`../../../../assets/${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>{service.replace("_", " ").charAt(0).toUpperCase() + service.replace("_", " ").slice(1)}</p>
                            </div>
                        );
                    }))) : (<div></div>))}
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default ContractorStandAlone