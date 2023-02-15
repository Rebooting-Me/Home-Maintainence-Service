import React from 'react'
import styles from './Navbar.module.css'
import Logo from '../../../assets/logo.svg'

const Navbar = () => {
  return (
    <nav className={`${styles.navbarWrapper} center`}>
        <div className={`${styles.navbarInner} center`}>
            <div className={`${styles.navbarLeft} center`}>
                <img src={Logo} alt='casacare' className={styles.brand}/>
            </div>
            <div className={styles.navbarRight}>
                <div className={styles.navbarLinksWrapper}>
                    <a href='/' className={`${styles.nav} center`}>About</a>
                    <a href='/' className={`${styles.nav} center`}>Listings</a>
                    <a href='/' className={`${styles.nav} center`}>Contact</a>
                    <a href='/' className={`${styles.nav} center`}>Log In</a>
                    <a href='/' className={`${styles.nav} center`}>Sign Up</a>
                    {/* <div>
                        <a href='/' className={`${styles.login} center`}>Log In</a>
                        <a href='/' className={`${styles.signup} center`}>Sign Up</a>
                    </div> */}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar