import React from 'react';
import styles from './Form.module.css';
import { Outlet, Link } from 'react-router-dom';

import Signin from '../../../assets/signin.svg';

// TODO
const handleSignInEmail = () => {};
const handleSignInPassword = () => {};
const handleSignIn = () => {};

const Form = () => {
  return (
    <div className={`${styles.formWrapper} center`}>
      <div className={styles.formImage}>
        <img src={Signin} alt="" />
      </div>
      <div className={styles.formInner}>
        <h2 className={styles.formHeader}>Sign in</h2>
        <hr className={styles.line}></hr>
        <div className={styles.formInnerWrapper}>
          <form className={styles.formContainer}>
            <label className={styles.inputLabel}>Email</label>
            <input
              onChange={handleSignInEmail}
              className={styles.input}
              type="email"
            />
            <label className={styles.inputLabel}>Password</label>
            <input
              onChange={handleSignInPassword}
              className={styles.input}
              type="password"
            />
            <div className={`${styles.buttonWrapper} center`}>
              <button
                onClick={handleSignIn}
                className={styles.btn}
                type="submit"
              >
                <p>Sign In</p>
              </button>
            </div>
          </form>
        </div>
        <div className={`${styles.login} center`}>
          <p>Don&apos;t have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Form;
