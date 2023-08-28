import React from 'react'
import DonationItem from './DonationItem'

import styles from './Donation.module.css'

const Donation = () => {
  return (
    <div className={styles.donation}>
        <h1 className={styles.header}>Donation</h1>
        <DonationItem title="Title" description="desc" max="500" val="400" id="123"/>
        <DonationItem title="Title" description="desc" max="500" val="200" id="124"/>
    </div>
  )
}

export default Donation