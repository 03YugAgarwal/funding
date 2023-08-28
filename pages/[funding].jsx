import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Funding.module.css";

const FundingDetails = () => {
  const router = useRouter();

  const val = 123;
  const max = 200;

  return (
    <section className={styles.container}>
      <h1>Title</h1>
      <p>Description</p>
      <div className={styles.parent}>
        <div
          className={styles.child}
          style={{ width: `${(val / max) * 100}%` }}
        >
          <span className={styles.amountText}>
            {val}/{max}
          </span>
        </div>
      </div>
      <button onClick={() => router.push("/")}>Back to Funding</button>
    </section>
  );
};

export default FundingDetails;
