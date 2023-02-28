import React from "react";
import styles from './Projects.module.css';

const Projects = () => {

    const createProject = () => {

    }

    const search = () => {

    }

    return (
        <div className={`${styles.outerTab}`}>
            <div className={`${styles.projectsTop}`}>
                <div className={`${styles.projectsSearch}`}>
                    <input placeholder="Search your projects" 
                        onChange={(e) => search(e.target.value)} size="50"/>
                    <button className={`${styles.searchButton}`} type="submit">Search</button>
                </div>
                <div className={`${styles.newProject}`}>
                    <button onClick={createProject}>New Project</button>
                </div>
            </div>
        </div>
    )
}

export default Projects;