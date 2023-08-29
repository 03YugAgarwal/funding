import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Funding.module.css";

import mongoose from "mongoose";
let Fund = mongoose.model("Fund");
import connectMongo from "@/lib/database";

const FundingDetails = (props) => {
  const router = useRouter();

  const {title, description, goal, amount} = props.fund

  return (
    <section className={styles.container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className={styles.parent}>
        <div
          className={styles.child}
          style={{ width: `${(amount / goal) * 100}%` }}
        >
          <span className={styles.amountText}>
            {amount}/{goal}
          </span>
        </div>
      </div>
      <button onClick={() => router.push("/")}>Back to Funding</button>
    </section>
  );
};

export async function getServerSideProps(context) {

  const { params } = context;

  try {
    await connectMongo();
    const fund = await Fund.findById(params.funding);
    return {
      props: {
        fund: JSON.parse(JSON.stringify(fund)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export default FundingDetails;
