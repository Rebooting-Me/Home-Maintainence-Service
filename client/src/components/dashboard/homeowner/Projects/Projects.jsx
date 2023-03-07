import React, { useState } from "react";
import styles from './Projects.module.css';
import NewProjectForm from "./NewProjectForm/NewProjectForm";
import Listings from "../../../listings/Listings";

const Projects = () => {

    const [projectFormOn, setProjectFormOn] = useState(false);

    const search = () => {
    }

    return (
        <div className={`${styles.outerTab}`}>
            { !projectFormOn && (
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
                <div>
                    <NewProjectForm 
                        showForm={setProjectFormOn} />
                </div>
            )}
            { !projectFormOn && (
                <div>
                    <Listings />
                </div>
            )}

        </div>
    )
}

export default Projects;