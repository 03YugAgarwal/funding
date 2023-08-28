import React from "react";

import styles from "./DonationItem.module.css";
import { useRouter } from "next/router";

const DonationItem = (props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <div className={styles.parent}>
        <div
          className={styles.child}
          style={{ width: `${(props.val / props.max) * 100}%` }}
        >
          <span className={styles.amountText}>
            {props.val}/{props.max}
          </span>
        </div>
      </div>
      <button onClick={() => router.push(`/${props.id}`)}>Show Details</button>
    </div>
  );
};

export default DonationItem;
