import React, {useState, useEffect} from 'react'
import styles from './Profile.module.css'
import { useAuthContext } from '../../../../hooks/useAuthContext';

const ProfileEdit = (props) => {
    const {user} = useAuthContext();
    const {onClickView} = props;
    const [profile_name, setProfileName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZip] = useState('');
    const [website_url, setWebsite] = useState('');
    const [phone_number, setPhone] = useState('');
    const [services, setServices] = useState([]);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const getProfile = async () => {
            setIsLoading(true);
            const response = await fetch('api/contractor/profile', {
                headers:{'Authorization': `Bearer ${user.token}`}
            });

            const json = await response.json();
            setProfileName(json.profile_name? json.profile_name:'');
            setCity(json.city? json.city:'');
            setState(json.state? json.state:'');
            setZip(json.zip_code? json.zip_code:'');
            setWebsite(json.website_url? json.website_url:'');
            setPhone(json.phone_number? json.phone_number:'');
            setServices(json.services? json.services:[]);
            setDescription(json.description? json.description:'');
            setIsLoading(false);
        };
        getProfile()
    }, []);

    const services_provided = ["plumbing","remodeling","pest_control","landscaping","electrical","roofing"];

    const updateProfile = async (profile_name, city, state, zip_code, website_url, phone_number, services, description) =>{

        const response = await fetch('api/contractor/profile', {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${user.token}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profile_name, city, state, zip_code, website_url, phone_number, services, description})
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        
    }

    const handleSave = async (e) => {
        e.preventDefault();
        updateProfile(profile_name, city, state, zip_code, website_url, phone_number, services, description);
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
                <div className={styles.address}>
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
                </div>
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
                <div className={styles.services}>
                {services_provided.map(
                    (service, index)=>{
                        const imgsvg = require(`../../../../assets/${service}.svg`);
                        return (
                            <div key={service + index} className={styles.card}>
                            <input 
                            id={service}
                            key={index} 
                            type="checkbox" 
                            checked={services.includes(service)}
                            onChange={()=>{handleCheckbox(index)}}
                            />
                            <label htmlFor={service}>
                            <img src={imgsvg} alt=''/>
                            <p>
                                {service.toLowerCase()
                                .split('_')
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(' ')}
                            </p>
                            </label>
                            </div>
                        )
                    }
                )}
                </div>
                <label className={styles.inputLabel}>Description</label>
                <textarea 
                    onChange={(e) => {setDescription(e.target.value)}}
                    value={description} 
                    className={styles.description} 
                    placeholder="Give a brief introduction here."
                    rows={15}
                    cols={35} 
                />
                <div className={styles.buttons}>
                <button
                    className={styles.cancel}
                    onClick={handleCancel}
                    type="submit"
                >
                    <p>Cancel</p>
                </button>
                <button
                    className={styles.save}
                    onClick={handleSave}
                    type="submit"
                >
                    <p>Save</p>
                </button>
                </div>
            </form>
    </div>
  )
}

export default ProfileEdit