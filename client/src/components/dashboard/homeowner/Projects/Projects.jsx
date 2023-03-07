import React, { useState } from "react";
import styles from './Projects.module.css';
import NewProjectForm from "./NewProjectForm/NewProjectForm";
import Listings from "../../../listings/Listings";

const Projects = () => {

    const [projectFormOn, setProjectFormOn] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    return (
        <div className={`${styles.outerTab}`}>
            { !projectFormOn && !currentProjectId && (
                <div className={`${styles.projectsTop}`}>
                    <div className={`${styles.projectsSearch}`}>
                        
                    </div>
                    <div className={`${styles.newProject}`}>
                        <button onClick={() => setProjectFormOn(true)}>New Project</button>
                    </div>
                </div>
                
            )}
            {!projectFormOn && !currentProjectId &&(
                <div>
                    <Listings setCurrentProjectId={setCurrentProjectId} />
                </div>
            )}
            
            { projectFormOn && (
                <div>
                    <NewProjectForm 
                        showForm={setProjectFormOn}
                        setCurrentProjectId={setCurrentProjectId} />
                </div>
            )}
            {/* { !projectFormOn && (
                <div>
                    <Listings setCurrentProjectId={setCurrentProjectId} />
                    
                </div>
            )} */}

        </div>
    )
}


export default Projects;