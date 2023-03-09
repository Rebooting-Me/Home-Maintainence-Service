import React from 'react';
import plumbing from './icons/plumbing.svg';
import electrical from './icons/electrical.svg';
import landscaping from './icons/landscaping.svg';
import roofing from './icons/roofing.svg';
import pest from './icons/pest.svg';
import remodeling from './icons/remodeling.svg';
import styles from './Listings.module.css';
// Add more imports for all the service icons here

const ServiceIcon = ({ service }) => {
  console.log("SERVICE" ,service);
  let icon = null;

  switch (service) {
    case 'plumbing':
      icon = plumbing;
      break;
    case 'electrical':
      icon = electrical;
      break;
    case 'landscaping':
      icon = landscaping;
      break;
    case 'roofing':
      icon = roofing;
      break;
    case 'pest_control':
      icon = pest;
      break;
    case 'remodeling':
      icon = remodeling;
      break;

    default:
      break;
  }

  return <img className={styles.serviceIcon} src={icon} alt={service} />;
};

export default ServiceIcon;
