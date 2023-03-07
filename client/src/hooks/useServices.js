import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useServices = () =>{
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getServices = async () =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch('api/services/getServices', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        
        if(response.ok) {
            setIsLoading(false);
            return json.services;
        }
    }

    return { getServices, isLoading, error }
}