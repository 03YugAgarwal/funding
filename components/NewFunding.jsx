import { useSession } from "next-auth/react";
import React, { useRef } from "react";

import styles from "./NewFunding.module.css";

const NewFunding = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const goalRef = useRef();

  const { data: session } = useSession();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descRef.current.value;
    const goal = goalRef.current.value;

    let email = session.user.email;

    const res = await fetch("/api/fund/newFund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        goal,
        email,
      }),
    });

    const data = await res.json();
    alert("Success");
  };

  let component;

  if (!session) {
    component = <div>Sign in to create a fund</div>;
  } else {
    component = (
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.pair}>
          <label htmlFor="">Title</label>
          <div className={styles.inputDiv}>
            <input type="text" ref={titleRef} placeholder="Raising funding for ..." />
          </div>
        </div>
        <div className={styles.pair}>
          <label htmlFor="">Description</label>
          <div className={styles.inputDiv}>
            <input type="text" ref={descRef} placeholder="I want to raise this fund for ..., in .... days" />
          </div>
        </div>
        <div className={styles.pair}>
          <label htmlFor="">Goal (in INR)</label>
          <div className={styles.inputDiv}>
            <input type="text" ref={goalRef} placeholder="1000"  />
          </div>
        </div>
        <button>Submit</button>
      </form>
    );
  }

  return <>{component}</>;
};

export default NewFunding;
