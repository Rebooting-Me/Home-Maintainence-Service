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
            <a href="/" className={`${styles.nav} center`}>
              About
            </a>
            <a href="/" className={`${styles.nav} center`}>
              Contact
            </a>
            {user && (
            <Link to="/dashboard" className={`${styles.nav} center`}>
              Dashboard
            </Link>
            )}
            {!user && 
              (<Link to="/signin" className={`${styles.nav} center`}>
                Sign In
              </Link>)}
            {!user && 
              (<Link to="/signup" className={`${styles.nav} center`}>
                Sign Up
              </Link>)}
            {user && (
            <button onClick={handleClick}>Log out</button>
            )}
            
            {/* <div>
                        <a href='/' className={`${styles.login} center`}>Log In</a>
                        <a href='/' className={`${styles.signup} center`}>Sign Up</a>
                    </div> */}
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default Navbar;
