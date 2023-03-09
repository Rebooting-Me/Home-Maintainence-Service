import React, { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";
import styles from "./ServicesButtonGroup.module.css";

const BUTTON_ID = "-button";

const ServicesButtonGroup = (props) => { 
    const { setServices, selectedServices } = props
    //handleSelect should be a function in the parent that receives the
    //selected service from this button group
    const { getServices, isLoading, error } = useServices();
    const [state, setState] = useState({});

    const buttonPressed = (service) => {
        const id = service + BUTTON_ID;
        console.log("state", state);
        const element = document.getElementById(id);
        const services = [...selectedServices];

        if(!element.classList.contains("clicked")) {
            element.classList.add("clicked");
            element.style.opacity = "100%";
            element.style.border = "1.5px solid #F93059";
            if(!services.includes(service))
                services.push(service);
            
        } else {
            element.classList.remove("clicked");
            element.style.opacity = "60%";
            element.style.border = "none";
            const index = services.indexOf(service);
            if (index > -1) { // only splice array when item is found
                services.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        return services;
        
    }

    useEffect(() => {
        const fetchServices = async () => {
            const services = await getServices();
            setState({
                ...state, 
                "services": services
            });
            populateSelectedServices();
        }
        fetchServices();
    }, []);
    
    const addService = (e, newService) => {
        e.preventDefault();
        const newServiceArray = buttonPressed(newService);
        setServices("services", newServiceArray);
    }

    const addSelectedService = (service) => {
        const newServiceArray = buttonPressed(service);
        setServices("services", newServiceArray);
    }

    const populateSelectedServices = () => {
        selectedServices.forEach((service) => {
            addSelectedService(service);
        })
    }
    
    return (
        <div className={`${styles.outerGroupWrapper}`}>
            { 
                isLoading ? 
                    (
                        <div>Loading...</div> 
                    ) 
                    : 
                    (
                        <div className={`${styles.innerGroupWrapper}`}>
                            {
                                state?.services? 
                                    (state.services.map((service)=>{
                                        const imgsvg = require(`../../assets/${service}.svg`);
                                        const serviceString = service.replace("_", " ");
                                        const decoratedServiceString = serviceString.charAt(0).toUpperCase() + serviceString.slice(1);
                                        return (
                                            <div key={service} className={`${styles.buttonSet}`}>
                                                <button 
                                                    id={service + BUTTON_ID}
                                                    onClick={(e) => {addService(e,service)}}
                                                    value={service} >
                                                    <img src={imgsvg} alt=''/>
                                                    <p>{decoratedServiceString}</p>
                                                </button>
                                            </div>
                                        );
                                    }))
                                    :
                                    <div>{ error }</div>
                            }
                        </div>

                    )
            }

        </div>
    )
}

export default ServicesButtonGroup;