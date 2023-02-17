import React from 'react'
import { Fragment } from 'react'
import styles from './Features.module.css'
import { features } from '../../../constants/features'

// might need a central resource file
import House from '../../../assets/house.svg'
import Tools from '../../../assets/tools.svg'

const Features = () => {
  return (
    <div className={`${styles.featuresWrapper} center`}>
        <div className={styles.homeImage}>
            <img src={House} alt=''/>
        </div>
        <div className={`${styles.featuresHeader} center`}>
            <h2>What we provide</h2>
        </div>
        <div className={`${styles.featureListWrapper}`}>
            <div className={`${styles.featureList} center`}>
                {
                    features.map(({feature, description, image})=>{
                        var imgsvg = require(`../../../${image}`);
                        return (
                            <div key={feature} className={`${styles.featureCard} center`}>
                                <Fragment>
                                    <div className={`${styles.featureIconWrapper} center`}>
                                        <img className={styles.featureImg} src={imgsvg} alt={feature}/>
                                        <div className={styles.feature}>
                                            <p>{feature}</p>
                                        </div>
                                    </div>
                                    <div className={styles.featureDescription}>
                                        <p>{description}</p>
                                    </div>
                                </Fragment>
                            </div>
                        );
                    })
                }
            </div>
        </div>
        <div className={styles.toolsImage}>
            <img src={Tools} alt=''/>
        </div>
    </div>
  )
}

export default Features