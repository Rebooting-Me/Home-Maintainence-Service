import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useGetProjectDetails = () =>{
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getProjectDetails = async (listing_id) =>{
        setIsLoading(true);
        setError(null);
        const response = await fetch('api/user/listings/'+listing_id, {
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
            return json;
        }
    }

    return { getProjectDetails, isLoading, error };
}