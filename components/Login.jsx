import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const handleSignIn = async () => {
    if (!localStorage.getItem("id")) {
      await signIn();
    } else {
      alert("You are already logged in");
    }
  };

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session,
            }),
          });

          const data = await res.json();
          localStorage.setItem("id", data.result._id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      if (session) {
        router.replace("/");
      }
    }
  }, [session,router]);

  return (
    <section>
      <h1>Google Login / Signin</h1>
      <button onClick={handleSignIn}>Login with Google</button>
      {session && (
        <button
          onClick={() => {
            localStorage.removeItem("id");
            signOut();
          }}
        >
          Sign out
        </button>
      )}
    </section>
  );
};

export default Login;
