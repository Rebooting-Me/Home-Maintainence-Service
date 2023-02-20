import {React, Fragment} from 'react'
import styles from './ContractorComment.module.css'

import Service from '../../../assets/service.svg'
import Quotes from '../../../assets/quotes.svg'
import Contractor from '../../../assets/contractor-r.svg'
import { contractorComments } from '../../../constants/contractorComments';

function ContractorComment() {
  return (
    <div className={`${styles.contractorWrapper} center`}>
        <div className={styles.contractorHeaderWrapper}>
            <h1 className={styles.contractorHeader}>What our Contractors are saying</h1>
            <div className={styles.contractorFav}>
                <img src={Contractor} alt=""/>
            </div>
        </div>
        <div className={`${styles.contractorInnerWrapper} center`}>
            <div className={styles.contractorCommentListWrapper}>
                <div className={styles.commentList}>
                    {contractorComments.map(({ name, comment, image }) => {
                        const imgpng = require(`../../../${image}`);
                        return (
                        <div key={name} className={`${styles.commentCard} center`}>
                            <Fragment>
                            <div className={`${styles.contractorImageWrapper} center`}>
                                <img
                                src={imgpng}
                                alt=""
                                />
                            </div>
                            <div className={styles.commentWrapper}>
                                <img src={Quotes} alt="" className={styles.quotes}/>
                                <p>{comment}</p>
                                <div className={styles.contractorName}>
                                    <p>{`- ${name}`}</p>
                                </div>
                            </div>
                            </Fragment>
                        </div>
                        );
                    })}
                </div>
                <div className={styles.servImage}>
                    <img src={Service} alt=""></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContractorComment