import { useSession } from "next-auth/react";
import React, { useRef } from "react";

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

    let email = session.user.email

    const res = await fetch("/api/fund/newFund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        goal,
        email
      }),
    });

    const data = await res.json();
    alert('Success')
  };

  let component;

  if (!session) {
    component = <div>Sign in to create a fund</div>;
  } else {
    component = (
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="">Title</label>
        <input type="text" ref={titleRef} />
        <label htmlFor="">Description</label>
        <input type="text" ref={descRef} />
        <label htmlFor="">Goal</label>
        <input type="text" ref={goalRef} />
        <button>Submit</button>
      </form>
    );
  }

  return <>{component}</>;
};

export default NewFunding;
