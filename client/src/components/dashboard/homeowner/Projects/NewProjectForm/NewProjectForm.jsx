import React, { useState } from "react";
import ServicesButtonGroup from "../../../../ServicesButtonGroup/ServicesButtonGroup";
import { useCreateProject } from "../../../../../hooks/useCreateProject";
import styles from './NewProjectForm.module.css';


const NewProjectForm = (props) => {
    const { showForm } = props;
    const [state, setState] = useState({
        title: "",
        description: "",
        city: "",
        state: "",
        zip_code: "",
        services: []
    });
    const { createProject, isLoading, error } = useCreateProject();

    const storeListing = async (e) => {
        e.preventDefault();
        await createProject(state);
        if(!error) {
            showForm(false);
        }
        //reroute to standalone listing
    }

    const setFieldInState = (field, value) => {
        setState({
            ...state,
            [field]: value
        });
    }

    return (
        <div className={`${styles.tabWrapper}`}>
            {
                isLoading ? 
                        (
                            <div>Loading...</div> 
                        ) 
                        : 
                        (
                            <div className={`${styles.outerWrapper}`}>
                                {error && <div className={`${styles.error}`}>Error</div>}
                                <form id="create-project-form" onSubmit={storeListing}>
                                    <div className={`${styles.outerFormWrapper}`}>
                                        <div className={`${styles.inputWrapper}`}>
                                            <div className={`${styles.simpleInputSet}`}> 
                                                <label>Project Name</label>
                                                <input 
                                                    type="text"
                                                    onChange={(e) => {setFieldInState("title", e.target.value)}}
                                                    value={state.title}
                                                />
                                            </div>
                                            
                                            {/* <div className="simpleInputSet">
                                                <label>Phone</label>
                                                <input 
                                                    onChange={(e) => {setFieldInState("phone", e.target.value)}}
                                                    value={state.phone}
                                                />
                                            </div> */}
                                            
                                            <div className={`${styles.addressInputSet}`}>
                                                <label>Project Address</label>
                                                <div className={`${styles.addressInput}`}>
                                                    <input 
                                                        type="text"
                                                        placeholder="City" 
                                                        onChange={(e) => {setFieldInState("city", e.target.value)}}
                                                        value={state.city}
                                                        className={`${styles.cityInput}`}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="State" 
                                                        onChange={(e) => {setFieldInState("state", e.target.value)}}
                                                        value={state.state}
                                                        className={`${styles.stateInput}`}
                                                    />
                                                    <input
                                                        type="text" 
                                                        maxLength={5}
                                                        placeholder="Zip code" 
                                                        onChange={(e) => {setFieldInState("zip_code", e.target.value)}}
                                                        value={state.zip_code}
                                                        className={`${styles.zipCodeInput}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className={`${styles.simpleInputSet}`}>
                                                <label>Service Type</label>
                                                <ServicesButtonGroup 
                                                    setServices={setFieldInState}
                                                    selectedServices={state.services}
                                                />
                                            </div>
                                            
                                            <div className={`${styles.simpleInputSet}`}>
                                                <label>Project Description</label>
                                                <textarea 
                                                    rows={20}
                                                    cols={50}
                                                    type="text"
                                                    onChange={(e) => {setFieldInState("description", e.target.value)}}
                                                    value={state.description}
                            
                                                />
                                            </div>

                                        </div>

                                        <div className={`${styles.formButtonGroup}`}>
                                            <button onClick={() => showForm(false)}>Cancel</button>
                                            <button 
                                                disabled={isLoading}
                                                type="submit"> Save </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )   
            }
        </div>
    )
}

export default NewProjectForm;