import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../../../assets/logo.svg';
import { useSignout } from '../../../hooks/useSignout';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Navbar = () => {
  const { signout } = useSignout();
  const { user } = useAuthContext();
  const handleClick = () => {
    signout();
  } 

  return (
    <nav className={`${styles.navbarWrapper} center`}>
      <div className={`${styles.navbarInner} center`}>
        <div className={`${styles.navbarLeft} center`}>
          <Link to="/">
            <img src={Logo} alt="casacare" className={styles.brand} />
          </Link>
        </div>
          <div className={styles.navbarRight}>
          <div className={styles.navbarLinksWrapper}>
            {user && (
            <button onClick={handleClick}>Log out</button>
            )}
          </div>
        </div>     
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
