import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useCreateProject = () =>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user } = useAuthContext();

    const createProject = async (project) =>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('api/homeowner/newListing', {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${user.token}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

    }
    return { createProject, isLoading, error }
}