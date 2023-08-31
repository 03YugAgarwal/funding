import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Funding.module.css";

import { loadStripe } from '@stripe/stripe-js';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PK;
const stripePromise = loadStripe(publishableKey);
import axios from 'axios';

import mongoose from "mongoose";
let Fund = mongoose.model("Fund");
import connectMongo from "@/lib/database";
import { useSession } from "next-auth/react";

const FundingDetails = (props) => {
  const router = useRouter();
  const { status } = router.query;
  const { title, description, goal, amount, email } = props.fund;

  const { data: session } = useSession();

  const [donationAmount, setDonationAmout] = useState(0)
  const [loading, setLoading] = useState(false);

  const createCheckOutSession = async () => {
    setLoading(true)
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-stripe-session', {
      item: {
        _id: router.query.funding,
        price: donationAmount,
        name: title,
        description,
        quantity: 1
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if(result){
      console.log(result.json());
    }
    if (result.error) {
      alert(result.error.message);
    }
    setLoading(false)
  };


  const handleFundingDelete = () => {
    if (!session) {
      return;
    }
    if (session?.user?.email === email) {
      if (confirm("Are you sure you want to delete this?") == true) {
        fetch("/api/fund/deleteFund", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: router.query.funding,
          }),
        }).then((res) => {
          router.push("/");
        });
      } else {
        alert("Access Denied");
      }
    }
  };

  return (
    <section className={styles.container}>
      {status && status === 'success' && <h2 style={{color: 'green'}}>Payment Succesfull</h2>}
      {status && status === 'cancel' && <h2 style={{color: 'red'}}>Payment Cancelled</h2>}
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

      <h1>Donate: </h1>
      <input type="text" value={donationAmount} onChange={(e)=>setDonationAmout(e.target.value)} className={styles.input} />
      <button disabled={donationAmount <= 0} onClick={createCheckOutSession}>{loading ? 'Processing' : 'Donate'}</button>

      <button onClick={() => router.push("/")}>Back to Funding</button>
      {session?.user?.email === email && (
        <button onClick={() => router.push(router.query.funding + "/edit")}>
          Edit
        </button>
      )}
      {session?.user?.email === email && (
        <button onClick={handleFundingDelete}>Delete</button>
      )}
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
