import React, { useState, useEffect } from "react";
import styles from './Sidebar.module.css';
import Settings from '../../../../assets/setting.svg';
import List from '../../../../assets/list.svg';
import Profile from '../../../../assets/profile.svg';
import Bids from '../../../../assets/bids.svg';
import Reviews from '../../../../assets/reviews.svg';

const Sidebar = (props) => {
    const { onSelectTab, user, defaultTabId } = props;
    // const defaultTabId = 'sidebar-contractor-your-profile';
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

    // const { user } = useAuthContext();
    console.log('Refresh: ', )
    return (
        <nav className={`${styles.sidebarWrapper}`}>
            <div className={`${styles.sidebarInner}`}>
                <p className={`${styles.welcomeName}`}>Hi {user.name}!</p>
                <div className={`${styles.sidebarLinksWrapper}`}>
                    <button id='sidebar-contractor-your-profile' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractor-your-profile', e)}>
                        <img src={Profile} className={`${styles.menuItemImage}`}/>
                        <a>Your Profile</a>
                    </button>
                    <button id='sidebar-contractor-homeowner-projects' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractor-homeowner-projects', e)}>
                        <img src={List} className={`${styles.menuItemImage}`}/>
                        <a>Homeowner Projects</a>
                    </button>
                    <button id='sidebar-contractor-your-bids' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractor-your-bids', e)}>
                        <img src={Bids} className={`${styles.menuItemImage}`}/>
                        <a>Your Bids</a>
                    </button>
                    <button id='sidebar-contractor-your-reviews' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractor-your-reviews', e)}>
                        <img src={Reviews} className={`${styles.menuItemImage}`}/>
                        <a>Your Reviews</a>
                    </button>
                    <button id='sidebar-contractor-settings' className={`${styles.nav}`} onClick={(e) => handleClick('sidebar-contractor-settings', e)}>
                        <img src={Settings} className={`${styles.menuItemImage}`}/>
                        <a>Settings</a>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;