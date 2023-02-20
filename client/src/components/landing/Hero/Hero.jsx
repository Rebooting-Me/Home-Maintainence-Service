import React, { useState } from 'react';
import styles from './Hero.module.css';
import Family from '../../../assets/family.svg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [email, setEmail] = useState('');

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
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
            type="email"
            placeholder="Enter your email"
            className={styles.emailInput}
          ></input>
          <Link
            to="/signup"
            state={{email:email}}
            className={styles.signUp}
          ><p>Sign up</p></Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img src={Family} alt="" />
      </div>
    </div>
  );
};

export default Hero;
