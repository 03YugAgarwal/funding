import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [value, setValue] = useState({
    title: "",
    description: "",
    goal: "",
    amount: "",
    email: ""
  });

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {

    if(!session){
        return
    }

    const fetchFunds = async () => {
      const res = await fetch("/api/fund/getFundById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: router.query.funding,
        }),
      });

      let vals = await res.json();
      setValue({
        title: vals?.fund?.title,
        description: vals?.fund?.description,
        goal: vals?.fund?.goal,
        amount: vals?.fund?.amount,
        email: vals?.fund?.email
      });
    };
    fetchFunds();
  }, [router.query.funding, session]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/fund/updateFund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: value.title,
        description: value.description,
        goal: value.goal,
        email: value.email,
        _id: router.query.funding,
      }),
    });

    
    alert("Success");
    if(res.ok){
        router.push(`/${router.query.funding}`);
    }
  };

  let component;

  if (session?.user?.email !== value.email) {
    component = <div>You Cannot Edit This!</div>;
  } else {
    component = (
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          value={value.title}
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
        <label htmlFor="">Description</label>
        <input
          type="text"
          value={value.description}
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
        <label htmlFor="">Goal</label>
        <input
          type="text"
          value={value.goal}
          onChange={(e) => setValue({ ...value, title: e.target.value })}
        />
        <button>Submit</button>
      </form>
    );
  }

  return <>{component}</>;
};

export default Edit;
