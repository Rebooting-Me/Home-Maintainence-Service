import React, { useState } from "react";
import styles from './Projects.module.css';
import NewProjectForm from "./NewProjectForm/NewProjectForm";
import StandaloneListingView from "../../../StandaloneListingView/StandaloneListingView";
// TODO: import Listings

const Projects = () => {

    const [projectFormOn, setProjectFormOn] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [projectFormValues, setProjectFormValues] = useState({});

    const search = () => {
    }

    return (
        <div className={`${styles.outerTab}`}>
            { !projectFormOn && !currentProjectId && (
                <div className={`${styles.projectsTop}`}>
                    <div className={`${styles.projectsSearch}`}>
                        <input placeholder="Search your projects" 
                            onChange={(e) => search(e.target.value)} size="50"/>
                        <button className={`${styles.searchButton}`} type="submit">Search</button>
                    </div>
                    <div className={`${styles.newProject}`}>
                        <button onClick={() => setProjectFormOn(true)}>New Project</button>
                    </div>
                </div>
            )}
            { projectFormOn && (
                 <NewProjectForm 
                    showForm={setProjectFormOn}
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
            { /* TODO:
                <Listings 
                    setProjecCurrenttId={setCurrentProjectId} >
                */
            }

        </div>
    )
}

export default Projects;