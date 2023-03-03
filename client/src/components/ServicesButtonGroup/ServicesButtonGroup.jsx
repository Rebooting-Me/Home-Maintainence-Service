import React, { useState } from "react";
import { features } from "../../constants/features";

const ServicesButtonGroup = (props) => { 
    const { setServices, selectedServices } = props
    //handleSelect should be a function in the parent that receives the
    //selected service from this button group

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
                features.map(({ feature, image }) => {
                    const imgsvg = require(`../../${image}`);
                    return (
                        <div key={feature}>
                            <img src={imgsvg} />
                            <button onClick={(e) => {addService(e,feature)}}>{feature}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ServicesButtonGroup;