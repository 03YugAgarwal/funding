import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "@/styles/Funding.module.css";

import mongoose from "mongoose";
let Fund = mongoose.model("Fund");
import connectMongo from "@/lib/database";
import { useSession } from "next-auth/react";

const FundingDetails = (props) => {
  const router = useRouter();
  const {title, description, goal, amount, email} = props.fund

  const {data: session} =useSession()

  // let Semail = ''

  // useEffect(()=>{
  //   Semail = session?.user?.email

  // },[])

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
      { (session?.user?.email === email) &&  <button onClick={()=> router.push(router.query.funding+'/edit')}>Edit</button>}
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
