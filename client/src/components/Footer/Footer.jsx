import React from 'react';
import styles from './Footer.module.css';
import Logo from '../../assets/logo.svg';
import FavFace from '../../assets/fav-facebook.svg';
import FavGit from '../../assets/fav-github.svg';
import FavTweet from '../../assets/fav-tweeter.svg';
import FavInsta from '../../assets/fav-insta.svg';

const Footer = () => {
  return (
    <nav className={`${styles.footerWrapper} center`}>
      <div className={`${styles.footerColumn} center`}>
        <div className={`${styles.footerInner} center`}>
          <div className={`${styles.footerLeft} center`}>
            <span className={styles.footerLogo}>
              <img src={Logo} alt="" />
            </span>
            <a>Terms of Use</a>
            <a>Privacy Policy</a>
            <a>Contact us</a>
            <a>Testimonials</a>
            <a>Services</a>
          </div>
          <div className={`${styles.footerRight} center`}>
            <a>
              <img src={FavFace} />
            </a>
            <a>
              <img src={FavGit} />
            </a>
            <a>
              <img src={FavTweet} />
            </a>
            <a>
              <img src={FavInsta} />
            </a>
          </div>
        </div>
        <div className={`${styles.footerMid}`}>
          <p>© Copyright 2023, CasaCare. All Rights Reserved.</p>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
