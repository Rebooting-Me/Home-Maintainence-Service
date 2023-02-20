import {React, Fragment} from 'react'
import styles from './HomeownerComment.module.css'

import Home from '../../../assets/home.svg'
import Quotes from '../../../assets/quotes.svg'
import Homeowner from '../../../assets/homeowner.svg'
import { homeownerComments } from '../../../constants/homeownerComments';

function HomeownerComment() {
  return (
    <div className={`${styles.homeownerWrapper} center`}>
        <div className={styles.homeownerHeaderWrapper}>
            <h1 className={styles.homeownerHeader}>What our Homeowners are saying</h1>
            <div className={styles.homeownerFav}>
                <img src={Homeowner} alt=""/>
            </div>
        </div>
        <div className={`${styles.homeownerInnerWrapper} center`}>
            <div className={styles.homeownerCommentListWrapper}>
                <div className={styles.homeImage}>
                    <img src={Home} alt=""></img>
                </div>
                <div className={styles.commentList}>
                    {homeownerComments.map(({ name, comment, image }) => {
                        const imgpng = require(`../../../${image}`);
                        return (
                        <div key={name} className={`${styles.commentCard} center`}>
                            <Fragment>
                            <div className={`${styles.homeownerImageWrapper} center`}>
                                <img
                                src={imgpng}
                                alt=""
                                />
                            </div>
                            <div className={styles.commentWrapper}>
                                <img src={Quotes} alt="" className={styles.quotes}/>
                                <p>{comment}</p>
                                <div className={styles.homeownerName}>
                                    <p>{`- ${name}`}</p>
                                </div>
                            </div>
                            
                            </Fragment>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeownerComment