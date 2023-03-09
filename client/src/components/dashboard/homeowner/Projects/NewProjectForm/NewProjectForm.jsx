import React, { useState } from "react";
import ServicesButtonGroup from "../../../../ServicesButtonGroup/ServicesButtonGroup";
import { useCreateProject } from "../../../../../hooks/useCreateProject";
import styles from './NewProjectForm.module.css';


const NewProjectForm = (props) => {
    const { showForm, currentProjectId, setCurrentProjectId, projectFormValues, setProjectFormValues } = props;
    const [state, setState] = useState({
        title: projectFormValues.title || "" ,
        description: projectFormValues.description || "",
        city: projectFormValues.city || "",
        state: projectFormValues.state || "",
        zip_code: projectFormValues.zip_code || "",
        services: projectFormValues.services || []
    });
    const { createProject, editProject, isLoading, error } = useCreateProject();

    const storeListing = async (e) => {
        e.preventDefault();
        //should only be the id
        const newProject = await createProject(state);
        if(!error) {
            showForm(false);
        }
        setCurrentProjectId(newProject.listing_id);
        //reroute to standalone listing
    }

    const updateListing = async (e) => {
        e.preventDefault();
        //updatelisting
        const updatedProject = await editProject(state, currentProjectId);
        if(!error) {
            showForm(false);
        }
        setCurrentProjectId(updatedProject._id);
    }

    const setFieldInState = (field, value) => {
        setState({
            ...state,
            [field]: value
        });
    }

    const handleCancel = () => {
        setProjectFormValues({});
        showForm(false);
    }

    return (
        <div className={`${styles.tabWrapper}`}>
            {
                isLoading ? 
                        (
                            (<div className={styles.isLoading}>Loading</div>) 
                        ) 
                        : 
                        (
                            <div className={`${styles.outerWrapper}`}>
                                {error && <div className={`${styles.error}`}>Error</div>}
                                <form id="create-project-form" onSubmit={(projectFormValues.title)?updateListing:storeListing}>
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
                                            
                                            {/* <div className={`${styles.simpleInputSet}`}>
                                                <label>Phone</label>
                                                <input 
                                                    onChange={(e) => {setFieldInState("phone", e.target.value)}}
                                                    value={state.phone}
                                                    placeholder="(XXX)XXX-XXXX"
                                                    type="tel"
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
                                                <label>Service Types</label>
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
                                            <button onClick={handleCancel}>Cancel</button>
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