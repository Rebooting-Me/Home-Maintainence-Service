import React, { useState } from "react";
import styles from './Projects.module.css';
import NewProjectForm from "./NewProjectForm/NewProjectForm";
import StandaloneListingView from "../../../StandaloneListingView/StandaloneListingView";
import Listings from "../../../listings/Listings";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const Projects = () => {

    const [projectFormOn, setProjectFormOn] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [projectFormValues, setProjectFormValues] = useState({});

    const createProject = () => {
        setProjectFormValues({});
        setProjectFormOn(true);
    }

    const { user } = useAuthContext();

    const isHomeowner = (user) => {
        return (user.userType === "Homeowner");
    }

    return (
        <div className={`${styles.outerTab}`}>
            <div className={`${styles.projectsContent}`}>
                {!projectFormOn && !currentProjectId &&(
                    <div>
                        { isHomeowner(user) && (
                            <div className={`${styles.newProject}`}>
                                <button onClick={createProject}>Create Project</button>
                            </div>
                        )}
                        <Listings setCurrentProjectId={setCurrentProjectId} />
                    </div>
                )}
                
                { projectFormOn && isHomeowner(user) && (
                    <NewProjectForm 
                        showForm={setProjectFormOn}
                        currentProjectId={currentProjectId}
                        setCurrentProjectId={setCurrentProjectId}
                        projectFormValues={projectFormValues}
                        setProjectFormValues={setProjectFormValues} />
                )}
                { currentProjectId && !projectFormOn && (
                    <StandaloneListingView
                        projectId={currentProjectId}
                        setCurrentProjectId={setCurrentProjectId}
                        prepopulateForm={setProjectFormValues}
                        showForm={setProjectFormOn} />
                )}
            </div>

        </div>
    )
}


export default Projects;