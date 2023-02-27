import React, { useState, useEffect } from "react";
import styles from './Sidebar.module.css';
import Contractor from '../../../../assets/contractor-tools.svg';
import Settings from '../../../../assets/setting.svg';
import List from '../../../../assets/list.svg';

const Sidebar = (props) => {
    const { onSelectTab, user, defaultTabId } = props;

    const [activeTab, setActiveTab] = useState(defaultTabId);

    const handleClick = (id,  e) => {
        e.preventDefault();
        onSelectTab(id);
        buttonRelease(activeTab);
        id ? buttonPressed(id) : buttonPressed(defaultTabId);
        setActiveTab(id);
    }

    const buttonPressed = (id) => {
        const element = document.getElementById(id);
        element.style.color = "#F93059";
        element.firstChild.style.filter = "invert(31%) sepia(72%) saturate(2290%) hue-rotate(328deg) brightness(95%) contrast(105%)";
    } 

    useEffect(() => {
        onSelectTab(defaultTabId);
        buttonPressed(defaultTabId);
    }, []);

    const buttonRelease = (id) => {
        const element = document.getElementById(id);
        element.style.color = "black";
        element.firstChild.style.filter = "invert(0%) sepia(2%) saturate(0%) hue-rotate(253deg) brightness(100%) contrast(100%)";
    }

    return (
        <nav className={`${styles.sidebarWrapper}`}>
            <div className={`${styles.sidebarInner}`}>
                <p className={`${styles.welcomeName}`}>Hi {user.name}!</p>
                <div className={`${styles.sidebarLinksWrapper}`}>
                        <button id='sidebar-your-projects' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-your-projects', e)} >
                            <img src={List} />
                            <a>Your Projects</a>
                        </button>
                    
                        <button id='sidebar-contractors' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractors', e)}>
                            <img src={Contractor} />
                            <a>Contractors</a>
                        </button>
                        <button id='sidebar-settings' className={`${styles.nav}`}onClick={(e) => handleClick('sidebar-settings', e)}>
                            <img src={Settings} />
                            <a>Settings</a>
                        </button>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;