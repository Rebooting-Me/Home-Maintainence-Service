import React, { useEffect, useState } from "react";
import { useServices } from "../../hooks/useServices";

const ServicesButtonGroup = (props) => { 
    const { setServices, selectedServices } = props
    //handleSelect should be a function in the parent that receives the
    //selected service from this button group
    const { getServices, isLoading, error } = useServices();
    const [state, setState] = useState({});

    useEffect(() => {
        const fetchServices = async () => {
            const services = await getServices();
            setState({
                ...state, 
                "services": services
            });
        }
        fetchServices();
    }, []);
    
    const addService = (e, newService) => {
        e.preventDefault();
        setServices("services", [
            ...selectedServices,
            newService
        ]);
    }
    
    return (
        <div>
            { 
                isLoading ? 
                    (
                        <div>Loading...</div> 
                    ) 
                    : 
                    (
                        <div>
                            {
                                state?.services? 
                                    (state.services.map((service)=>{
                                        const imgsvg = require(`../../assets/${service}.svg`);
                                        return (
                                            <div key={service}>
                                                <img src={imgsvg} alt=''/>
                                                <button onClick={(e) => {addService(e,service)}}>{service}</button>
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