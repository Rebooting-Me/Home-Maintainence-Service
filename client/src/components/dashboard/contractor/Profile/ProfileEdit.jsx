import React, {useState} from 'react'
import styles from './Profile.module.css'
import { useAuthContext } from '../../../../hooks/useAuthContext';

const ProfileEdit = (props) => {
    const user = useAuthContext();
    const {onClickView, profile} = props;
    const [profile_name, setProfileName] = useState(profile?.profile_name? profile.profile_name:'');
    const [city, setCity] = useState(profile?.city? profile.city:'');
    const [state, setState] = useState(profile?.state? profile.state:'');
    const [zip_code, setZip] = useState(profile?.zip_code? profile.zip_code:'');
    const [website_url, setWebsite] = useState(profile?.website_url? profile.website_url:'');
    const [phone_number, setPhone] = useState(profile?.phone_number? profile.phone_number:'');
    const [services, setServices] = useState(profile?.services? profile.services:'');
    const [description, setDescription] = useState(profile?.description? profile.description:'');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const services_provided = ["plumbing","remodeling","pest_control","landscaping","electrical","roofing"];

    const updateProfile = async (profile) =>{

        const response = await fetch('api/contractor/profile', {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${user.token}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const newProfile = {
            profile_name: profile_name, 
            city: city, 
            state: state, 
            zip_code: zip_code, 
            website_url: website_url, 
            phone_number: phone_number, 
            services: services, 
            description: description
        };
        console.log(newProfile)
        updateProfile(newProfile);
        onClickView(); 
      };

      const handleCancel = async (e) => {
        e.preventDefault();  
        onClickView();  
      };

    const handleCheckbox = (index) => {
        const checkService = services_provided[index]
        let newServices = [...services, checkService]
        if (services.includes(checkService)){
            newServices = newServices.filter(service => service !== checkService)
        }
        setServices(newServices);
    }

  return (
    <div className={styles.profileWrapper}>
        {isLoading && <div>Loading</div>}
        {error && <div>{error}</div>}
            <form className={styles.profileForm}>
                <label className={styles.inputLabel}>Profile Name</label>
                <input 
                    onChange={(e) => {setProfileName(e.target.value)}}
                    value={profile_name} 
                    className={styles.input} 
                    placeholder="Name"
                    type="text" />
                <label className={styles.inputLabel}>Address</label>
                <input 
                    onChange={(e) => {setCity(e.target.value)}}
                    value={city} 
                    className={styles.input} 
                    placeholder="City"
                    type="text" />
                <input 
                    onChange={(e) => {setState(e.target.value)}}
                    value={state} 
                    className={styles.input} 
                    placeholder="State"
                    type="text" />
                <input 
                    onChange={(e) => {setZip(e.target.value)}}
                    value={zip_code} 
                    className={styles.input} 
                    placeholder="Zip code"
                    type="text" />
                <label className={styles.inputLabel}>Website</label>
                <input 
                    onChange={(e) => {setWebsite(e.target.value)}}
                    value={website_url} 
                    className={styles.input} 
                    placeholder="https://"
                    type="url" />
                <label className={styles.inputLabel}>Phone</label>
                <input 
                    onChange={(e) => {setPhone(e.target.value)}}
                    value={phone_number} 
                    className={styles.input} 
                    placeholder="(XXX)XXX-XXXX"
                    type="tel" />
                <label className={styles.inputLabel}>Service Offered</label>
                {services_provided.map(
                    (service, index)=>{
                        const imgsvg = require(`../../../../assets/${service}.svg`);
                        return (
                            <div key={service + index} >
                            <input 
                            key={index} 
                            type="checkbox" 
                            checked={services.includes(service)}
                            onChange={()=>{handleCheckbox(index)}}
                            />
                            <img src={imgsvg} alt=''/>
                            <p>
                                {service.toLowerCase()
                                .split('_')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')}
                            </p>
                            </div>
                        )
                    }
                )}
                <label className={styles.inputLabel}>Description</label>
                <input 
                    onChange={(e) => {setDescription(e.target.value)}}
                    value={description} 
                    className={styles.input} 
                    placeholder="Give a brief introduction here."
                    type="text" />
                <button
                    className={styles.btn}
                    onClick={handleSave}
                    type="submit"
                >
                    <p>Save</p>
                </button>
                <button
                    className={styles.btn}
                    onClick={handleCancel}
                    type="submit"
                >
                    <p>Cancel</p>
                </button>
            </form>
    </div>
  )
}

export default ProfileEdit