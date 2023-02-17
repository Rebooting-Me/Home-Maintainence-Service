import React from 'react';
import styles from './Hero.module.css';
import Family from '../../../assets/family.svg';

const Hero = () => {
  return (
    <div className={`${styles.heroWrapper} center`}>
      <div className={styles.heroInner}>
        <h2 className={styles.headerText}>
          Experience hassle-free home upkeep with CasaCare®
        </h2>
        <div className={styles.slogan}>
          <p>
            Connecting you to a network of expert contractors for all your
            repair and maintenance needs.
          </p>
        </div>
        <div className={styles.email}>
          <input
            type="text"
            placeholder="Enter your email"
            className={styles.emailInput}
          ></input>
          <input
            type="button"
            value="Sign Up"
            className={styles.signUp}
          ></input>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={Family} alt="" />
      </div>
    </div>
  );
};

export default Hero;
