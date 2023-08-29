import React from 'react'
import DonationItem from './DonationItem'
import styles from './Donation.module.css'

const Donation = (props) => {

  let donationItems = props.funds.map((item)=> {
    return <DonationItem key={item._id} title={item.title} description={item.description} max={item.goal} val={item.amount} id={item._id} />
  })

  return (
    <div className={styles.donation}>
        <h1 className={styles.header}>Donation</h1>
        {donationItems ? donationItems : 'No pending Donations'}
    </div>
  )
}


export default Donation