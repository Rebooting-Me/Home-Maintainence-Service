import React from 'react'
import styles from './Form.module.css'
import { Outlet, Link } from 'react-router-dom'

import Mailbox from '../../../assets/mailbox.svg'
import Homeowner from '../../../assets/homeowner.svg'
import Contractor from '../../../assets/contractor.svg'


//TODO
const handleName = ()=>{}
const handleEmail = ()=>{}
const handlePassword = ()=>{}
const handleSubmitHomeowner = ()=>{}
const handleSubmitContractor = ()=>{}
const handleCheckbox = ()=>{}

const Form = () => {
  return (
    <div className={`${styles.formWrapper} center`}>
        <div className={styles.formImage}>
            <img src={Mailbox} alt=''/>
        </div>
        <div className={styles.formInner}>
            <h2 className={styles.formHeader}>
                Sign up
            </h2>
            <hr className={styles.line}></hr>
            <div className={styles.formInnerWrapper}>
                <form className={styles.formContainer}>
                    <label className={styles.inputLabel}>Name</label>
                    <input onChange={handleName} className={styles.input} type='text' />
                    <label className={styles.inputLabel}>Email</label>
                    <input onChange={handleEmail} className={styles.input} type='email' />
                    <label className={styles.inputLabel}>Password</label>
                    <input onChange={handlePassword} className={styles.input} placeholder='Enter an 8-digit password' type='password' />
                    <div className={styles.checkboxWrapper}>
                        <input onChange={handleCheckbox}  type='checkbox'/>
                        <p>I`ve read and agree with&nbsp;</p> <a href='/'>Terms of Service</a><p>&nbsp;and our&nbsp;</p><a href='/'>Privacy Policy</a>
                    </div>
                    <div className={`${styles.buttonWrapper} center`}>
                        <button onClick={handleSubmitHomeowner} className={styles.btn} type="submit">
                            <p>As a Homeowner</p>
                            <img src={Homeowner} alt=''/>
                        </button>
                        <button onClick={handleSubmitContractor} className={styles.btn} type="submit">
                            <p>As a Contractor</p>
                            <img src={Contractor} alt=''/>
                        </button>
                    </div>
                </form> 
            </div>
            <div className={`${styles.login} center`}>
                <p>Already have an account?</p>
                <Link to=''>Log in</Link>
            </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default Form