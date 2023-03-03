import React, { useState } from 'react';
import styles from './Form.module.css';
import { Outlet, Link } from 'react-router-dom';
import { useSignin } from '../../../hooks/useSignin';

import Signin from '../../../assets/signin.svg';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, isLoading, error } = useSignin();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(email, password);

    await signin(email, password);

  };

  return (
    <div className={`${styles.formWrapper} center`}>
      <div className={styles.formImage}>
        <img src={Signin} alt="" />
      </div>
      <div className={styles.formInner}>
        <h2 className={styles.formHeader}>Sign in</h2>
        <hr className={styles.line}></hr>
        <div className={styles.formInnerWrapper}>
          {error && <div className={styles.error}>{error}</div>}
          <form className={styles.formContainer} onSubmit={handleSignIn}>
            <label htmlFor="email-input" className={styles.inputLabel}>Email</label>
            <input
              id="email-input"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              className={styles.input}
              type="email"
            />
            <label htmlFor="password-input" className={styles.inputLabel}>Password</label>
            <input
              id="password-input"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              className={styles.input}
              type="password"
            />
            <div className={`${styles.buttonWrapper} center`}>
              <button
                disabled={isLoading}
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
