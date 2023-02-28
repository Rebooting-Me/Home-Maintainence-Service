import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthContext } from '../../../../hooks/useAuthContext';
import Projects from "../Projects/Projects";
import styles from './Dashboard.module.css';

const Dashboard = () => {

    const { user } = useAuthContext();
    const defaultTabId = 'sidebar-your-projects';
    const [activeTab, setActiveTab] = useState();

    const getTab = () => {
        switch (activeTab) {
            case 'sidebar-your-projects':
                return <Projects />
        }
    }
    
    return (
        <div className={`${styles.pageWrapper}`}>
            <div className={`${styles.sidebar}`}>
                <Sidebar 
                    onSelectTab = {setActiveTab}
                    user = {user}
                    defaultTabId = {defaultTabId} />
            </div>
            <div className={`${styles.tab}`}>
                {getTab()}
            </div>
        </div>
    )
}

export default Dashboard;