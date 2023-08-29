import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
  }

  const router = useRouter();
  useEffect(()=>{
    if(session){
      router.replace('/profile')
    }
  },[session,router])

  return (
    <section>
      <h1>Google Login / Signin</h1>
      <button onClick={handleSignIn}>Login with Google</button>
      {session && (
        <button
          onClick={() => {
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
