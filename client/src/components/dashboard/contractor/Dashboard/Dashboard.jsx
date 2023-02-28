import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useAuthContext } from '../../../../hooks/useAuthContext';
import Profile from "../Profile/Profile";
import styles from './Dashboard.module.css';

const Dashboard = () => {

    const { user } = useAuthContext();
    const defaultTabId = 'sidebar-contractor-your-profile';
    const [activeTab, setActiveTab] = useState();

    const getTab = () => {
        switch (activeTab) {
            case 'sidebar-contractor-your-profile':
                return <Profile />;
            /* case 'sidebar-contractor-homeowner-projects':
                return <Projects />;
            case 'sidebar-contractor-your-bids':
                return <Bids />;
            case 'sidebar-contractor-your-reviews':
                return <Reviews />;
            case 'sidebar-contractor-settings':
                return <Settings />;
            default:
                return <Profile />; */
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