import { useSession,signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Profile = () => {
  
    const { data: session } = useSession();

    const router = useRouter()
    const handleSignOut = async () => {
        await signOut()
        localStorage.removeItem('id')
    }

    useEffect(()=>{
        if(!session){
            router.replace('/signup')
        }

    },[router,session])

  
    return (
    <>
      <div>Profile</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Profile;
