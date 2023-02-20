import { React } from 'react';
import styles from './About.module.css';


const About = () => {
  return (
    <div className={`${styles.aboutWrapper} center`}>
      <div className={`${styles.aboutHeader} center`}>
        <h2>How we work</h2>
      </div>
      <div className={`${styles.aboutDescription} center`}>
        <p>CaseCare® is a home repair and maintenance service that provides you with the services you need to keep your home in tip-top shape! We have a network of skilled professional contractors specializing in various home care services.</p>
      </div>
      <div className={`${styles.aboutListWrapper} center`}>
        <div className={`${styles.aboutList}`}>
            <div className={`${styles.aboutListHeader}`}>
                <h3>If you&apos;re a Homeowner</h3>
            </div>
            <li className={styles.aboutListContent}>
                <ul>Create a listing describing what service&#40;s&#41; you need.</ul>
                <ul>Receive quotes from interested contractors.</ul>
                <ul>Choose your preferred contractor for the job!</ul>
            </li>
        </div>
        <div className={`${styles.aboutListDivisor} center`}></div>
        <div className={`${styles.aboutList}`}>
            <div className={`${styles.aboutListHeader}`}>
                <h3>If you&apos;re a Contractor</h3>
            </div>
            <li className={styles.aboutListContent}>
                <ul>Browse our catalog of service listings from homeowners.</ul>
                <ul>Get in touch with homeowners.</ul>
                <ul>Once a homeowner accepts your bid, you&apos;re all set to work!</ul>
            </li>
        </div>
      </div>
    </div>
  );
};

export default About;