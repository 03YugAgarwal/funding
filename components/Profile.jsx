import { useSession,signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DonationItem from "./Donations/DonationItem";

import styles from './Login.module.css'

const Profile = () => {
  
    const { data: session } = useSession();

    const router = useRouter()
    const handleSignOut = async () => {
        await signOut()
    }

    const [value, setValue] = useState([{
        title:'',
        description:'',
        goal:'',
        amount:''
    }])

    useEffect(()=>{
        if(!session){
            router.replace('/signup')
            return
        }
        const fetchFunds = async()=>{

            const res = await fetch('http://localhost:3000/api/fund/getMyFund',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:session?.user?.email
                })
            })
            
            let vals = await res.json()
            setValue(vals)
        }
        fetchFunds()
    },[router,session])

  
    return (
    <div className={styles.container}>
      <div className={styles.title} >Profile</div>
      <button onClick={handleSignOut} className={styles.signButton}  >Sign Out</button>
      {value.fund?.map((item)=>{
        return <DonationItem key={item._id} title={item.title} description={item.description} max={item.goal} val={item.amount} id={item._id} />
      })}
    </div>
  );
};

export default Profile;
