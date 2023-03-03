import React, { useState } from 'react';
import styles from './Form.module.css';
import { Outlet, Link } from 'react-router-dom';
import {useSignup} from '../../../hooks/useSignup';
import { useLocation } from 'react-router-dom';

import Mailbox from '../../../assets/mailbox.svg';
import Homeowner from '../../../assets/homeowner.svg';
import Contractor from '../../../assets/contractor.svg';


const Form = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(location.state?.email);
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState('');
  const [userType, setUserType] = useState('');
  const {signup, isLoading, error} = useSignup();

  const handleCheckbox = (e) => {
    setAgree(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password, userType);

  };

  return (
    <div className={`${styles.formWrapper} center`}>
      <div className={styles.formImage}>
        <img src={Mailbox} alt="" />
      </div>
      <div className={styles.formInner}>
        <h2 className={styles.formHeader}>Sign up</h2>
        <hr className={styles.line}></hr>
        <div className={styles.formInnerWrapper}>
          {error && <div className={styles.error}>{error}</div>}
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label className={styles.inputLabel}>Name</label>
            <input 
              onChange={(e) => {setName(e.target.value)}}
              value={name} 
              className={styles.input} 
              type="text" />
            <label className={styles.inputLabel}>Email</label>
            <input
              onChange={(e) => {setEmail(e.target.value)}}
              value={email}
              className={styles.input}
              type="email"
            />
            <label className={styles.inputLabel}>Password</label>
            <input
              onChange={(e) => {setPassword(e.target.value)}}
              value={password}
              className={styles.input}
              placeholder="Enter an 8-digit password"
              type="password"
            />
            <div className={styles.checkboxWrapper}>
              <input onChange={handleCheckbox} type="checkbox" />
              <p>I&apos;ve read and agree with&nbsp;</p>{' '}
              <a href="/">Terms of Service</a>
              <p>&nbsp;and our&nbsp;</p>
              <a href="/">Privacy Policy</a>
            </div>
            <div className={`${styles.buttonWrapper} center`}>
              <button
                disabled={(!agree) || isLoading}
                onClick={() => {setUserType("Homeowner")}}
                className={styles.btn}
                type="submit"
              >
                <p>As a Homeowner</p>
                <img src={Homeowner} alt="" />
              </button>
              <button
                disabled={(!agree) || isLoading}
                onClick={() => {setUserType("Contractor")}}
                className={styles.btn}
                type="submit"
              >
                <p>As a Contractor</p>
                <img src={Contractor} alt="" />
              </button>
            </div>
          </form>
        </div>
        <div className={`${styles.login} center`}>
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Form;
