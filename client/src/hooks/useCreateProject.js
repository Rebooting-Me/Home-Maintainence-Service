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

        if(response.ok) {
            setIsLoading(false);
            return json;
        }
        
    }
    const editProject = async (project, currentProjectId) => {
        
        const response = await fetch('api/homeowner/listings/'+currentProjectId, {
            method: "PATCH",
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

        if(response.ok) {
            setIsLoading(false);
            return json;
        }
    }

    const deleteProject = async (currentProjectId) => {
        
        const response = await fetch('api/homeowner/listings/'+currentProjectId, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok) {
            setIsLoading(false);
            return json;
        }
    }

    return { createProject, editProject, deleteProject, isLoading, error }
}