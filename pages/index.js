import Head from 'next/head'
import Hero from '@/components/Hero'
import Donation from '@/components/Donations/Donation'

import mongoose from "mongoose";
import Fund from '@/models/fund'; 
import connectMongo from "@/lib/database";

export default function Home(props) {

  return (
    <>
      <Head>
        <title>Funding</title>
        <meta name="description" content="A simple website to raise Funding for anything." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
      </main>
      <Donation funds={props.funds}/>
    </>
  )
}


export const getServerSideProps = async () => {
  try {
    await connectMongo();
    const funds = await Fund.find();
    return {
      props: {
        funds: JSON.parse(JSON.stringify(funds)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};