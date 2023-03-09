import React, { useEffect, useState } from 'react'
import styles from './StandaloneListingView.module.css'
import { useGetProjectDetails } from '../../hooks/useGetProjectDetails'
import { projectHolder } from '../../constants/projectHolder'
import { useAuthContext } from '../../hooks/useAuthContext'

const StandaloneListingView = (props) => {
    const { projectId, setCurrentProjectId, prepopulateForm, showForm } = props
    const { getProjectDetails, isLoading, error } = useGetProjectDetails();
    const [project, setProject] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
        const getProject = async () => {
            const projectDetails = await getProjectDetails(projectId);
            setProject({...projectDetails});
        }
        getProject();
    }, [])

    const editForm = () => {
        prepopulateForm(project);
        showForm(true);
    }

  return (
    <div className={styles.projectWrapper}>
        {isLoading ? (<div className={styles.isLoading}>Loading</div>) : 
        (
        <div className={styles.projectInnerWrapper}>
            <button onClick={() => {setCurrentProjectId(null)}} className={styles.goBackButton}>&#60; View all your projects</button>
            <div className={styles.projectHeaderWrapper}>
            {/* <div className={styles.projectImageWrapper}>
                <img src={project?.project_image?(require(`${project.project_image}`)):(require(`../../assets/${projectHolder.project_image}`))} alt=''/>
            </div> */}
                <div className={styles.projectInfo}>
                    <div className={styles.projectName}>
                        <h2>{project?.title?(project.title):(projectHolder.title)}</h2>
                    </div>
                    <div className={styles.projectAddress}>
                        <p>{project?.city? (project.city) : (projectHolder.city)},</p>
                        <p>{project?.state? (project.state) : (projectHolder.state)},</p>
                        <p>{project?.zip_code? (project.zip_code) : (projectHolder.zip_code)}</p>
                    </div>
                    
                    {/* <div className={styles.projectPhone}>
                        <p>{project?.phone_number? (project.phone_number) : (projectHolder.phone_number)}</p>
                    </div> */}
                    
                </div>
            </div>
            { user.userType=="Homeowner" && 
                (<div className={styles.editButtonWrapper}>
                    <button onClick={editForm}>Edit</button>
                </div>)
            }
            <div className={styles.projectContentWrapper}>
                {/* <div className={styles.projectImageWrapper}>
                    <img src={project?.project_image?(require(`${project.project_image}`)):(require(`../../assets/${projectHolder.project_image}`))} alt=''/>
                </div> */}
                <div className={styles.projectServices}>
                    <h3>Service Types</h3>
                    <div className={styles.projectServiceCards}>
                    {(project?.services? ((project.services?.map((service)=>{
                        const imgsvg = require(`../../assets/${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>{service}</p>
                            </div>
                        );
                    }))) : (projectHolder.services.map((service)=>{
                        const imgsvg = require(`../../assets/${service}.svg`);
                        return (
                            <div key={service} className={styles.service}>
                                <img src={imgsvg} alt=''/>
                                <p>
                                    {service.toLowerCase()
                                    .split('_')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')}
                                </p>
                            </div>
                        );
                    })))}
                    </div>
                </div>
                <div className={styles.projectDescription}>
                    <h3>About this project</h3>
                    <p>{project?.description? (project.description) : (projectHolder.description)}</p>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default StandaloneListingView;