'use client'

import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import Image05 from "@/public/assets/images/image05.gif";
import presentationGPT from "@/public/assets/images/presentationGPT.jpg";
import searcholic from "@/public/assets/images/searcholic.jpg";
import liro from "@/public/assets/images/liro.jpg";
import sketchesGPT from "@/public/assets/images/sketchesGPT.jpg";
import {  useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { decrement, decrementByAmount, increment, incrementByAmount, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/userSlice";
import { useEffect, useState } from "react";
import { postRequest } from "@/utils/postRequest";
import { getStripe } from "@/utils/getstripe";



export default function HomePage() {
  const router = useRouter()
  const {data:session, status} = useSession();
  const count = useAppSelector((state) => state.counterReducer.value);
  const user = useAppSelector((state) => state.userReducer);
  // console.log(user)
  const dispatch = useAppDispatch();

  const fetchedUser = async () => {
    if(session && session.user) {
      const response = await fetch("http://localhost:3000/api/users/" + (session.user.email), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session && session.user),
      })
      const data = await response.json();
      // console.log(data)
      dispatch(setUser(data))
    }
  }

  useEffect(() => {
    if(session && session.user && user.email == null) {
      fetchedUser()
    }
  })

  type User = {
    _id: string | null;
    googleId: string | null;
    name: string | null;
    email: string | null;
    image: string | null;
    plan: string | null;
    accessCount: number | null;
    payedAt: Date | null;
    expired: boolean | null;
    createdAt: Date | null;
  };

  const ad = [
    {
      title:"Complete Makeover",
      description:"Give your room a complete makeover with AI and transform your dull and uninspiring rooms into extraordinary spaces."
    },
    {
      title:"Design Styles",
      description:"Discover several design styles like Modern, Minimalist, Professional, Tropical, Coastal, Tribal, Vintage, Industrial, Neoclassic to suit your requirments."
    },
    {
      title:"Save Time & Money",
      description:"Say goodbye to expensive traditional interior designing services. With ImprovementAI, you can save thousands of dollars in cost and time."
    },
  ]

  const disablePlan = [
    'Commercial License',
    '24 Hours Support',
  ]

  const plan = [
    {
      title:'FREE PLAN',
      price:'$0',
      color:"text-slate-900",
      description:"Suitable for trying out ImprovementAI",
      list:[
        '3 Designs',
        'Standard Quality Renders',
        'Standard AI Model',
        'All Styles Unlocked',
        'No Watermark',
        'Commercial License',
        '24 Hours Support',
      ]
    },
    {
      title:'PRO PLAN',
      price:'$9.99',
      color:"text-sky-400",
      description:"Suitable for individuals looking to transform their home",
      list:[
        '50 Designs Every Month',
        'Higher Quality Renders',
        'Newest AI Model',
        'All Styles Unlocked',
        'No Watermark',
        'Commercial License',
        '24 Hours Support'
      ]
     },
     {
      title:'ULTRA PLAN',
      price:'$19.99',
      color:"text-lime-400",
      description:"Suitable for real estate agents, home builders, interior designers and businesses.",
      list:[
        '150 Designs Every Month',
        'Higher Quality Renders',
        'Newest AI Model',
        'All Styles Unlocked',
        'No Watermark',
        'Commercial License',
        '24 Hours Support'
      ]
     }
  ]

  const restTools = [
    {
      domain: 'PresentationGPT.com',
      description: 'AI Presentation Generator',
      image: presentationGPT,
      url: 'https://www.presentationgpt.com/'
    },
    {
      domain: 'Liro.ai',
      description: 'AI Image Generator',
      image: liro,
      url: 'https://www.liro.ai/'
    },
    {
      domain: 'SketchesGPT.com',
      description: 'AI Sketch To Image',
      image: sketchesGPT,
      url: 'https://www.sketchesgpt.com/'
    },
    {
      domain: 'Searcholic.com',
      description: 'AI Search Engine',
      image: searcholic,
      url: 'https://www.searcholic.com/'
    },
  ]

  const [loading, setLoading] = useState(false)

  const checkout = async () => {
    setLoading(true)

    // Create a Checkout Session.
    const response = await postRequest('/api/checkout-session', {  })

    if (response.statusCode === 500) {
        console.error(response.message)
        return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
};

  return (
    <div className="flex max-w-8xl mx-auto flex-col items-center justify-center pb-2 min-h-screen">
      <Header />
      
      <main className="flex flex-1 w-full flex-col align-center justify-around text-center px-5 sm:mt-3 mt-0 background-gradient">
        <div className="flex items-center w-full flex-col">
          <div className="flex flex-row space-y-10 lg:mt-4 l:mt-2 mb-16">
            <div className="flex justify-between lg:space-x-4 lg:flex-row flex-col-reverse">
              <div className="lg:w-1/2 w-full">
                <h1 className="mx-auto max-w-4xl font-display text-3xl font-bold tracking-normal text-purple-900 sm:text-7xl md:mt-5 xl:pt-24 md:pt-8">
                  The #1{" "}
                  <span className="relative whitespace-nowrap text-blue-600">
                    <SquigglyLines />
                    <span className="relative">AI-Powered</span>
                  </span>{" "}
                  Interior Designer
                </h1>
                <h2 className="mx-auto my-10 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
                Upload a photo of your room and let our AI do the magic.
                </h2>
                <Link
                  className="bg-green-400 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-green-500 transition"
                  href="/dream"
                >
                  Start The Magic
                </Link>
              </div>
              <div className="sm:mt-3 mt-0 lg:w-1/2 w-full">
                <figure>
                  <Image
                    alt="Generated photo of a room with roomGPT.io"
                    // width={96}
                    // height={96}
                    src={Image05}
                    className="w-full h-auto object-cover h-96 rounded-3xl sm:mt-0 mt-2 "
                    priority
                  />
                </figure>
              </div>
            </div>
          </div>
          <div className="flex flex-row space-y-10 mt-4 mb-16 text-black">
            <div className="flex md:space-x-8 lg:mx-5 md:space-y-0 md:flex-row flex-col space-y-8 px-5">
              {ad.map((item, i) => 
                <div
                  key={item.title + i}
                  className={`rounded-2xl border border-gray-100 shadow-xl w-full md:w-1/${ad.length}`} 
                >
                  <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 h-full">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-xl">{item.title}</h2>
                    <p className="mt-2 text-md text-gray-500">{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className=" flex flex-row space-y-10 mt-4 mb-16 text-black">
            <div className="flex md:space-x-8 md:flex-row flex-col  px-5">
              <h4 style={{ marginBottom: 16 }}>{count}</h4>
              <div className="btn btn-success" onClick={() => dispatch(incrementByAmount(5))}>increment</div>
              <div className="btn btn-warning"
                onClick={() => dispatch(decrementByAmount(2))}
                style={{ marginInline: 16 }}
              >
                decrement
              </div>
              <div className="btn" onClick={() => dispatch(reset())}>reset</div>
            </div>
          </div> */}
          <div className="flex flex-row space-y-10 mt-4 mb-16 text-black">
            <div className="flex md:space-x-8 md:flex-row md:space-y-0 space-y-5 flex-col  px-5">
            {plan.map((item, i) => 
                <div
                key={item.title + i}
                  className={`transition duration-300 ease-in-out rounded-2xl hover:rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-400 p-1 shadow-xl w-full md:w-1/${plan.length}`} 
                >
                  <a className="transition duration-300 ease-in-out block rounded-xl hover:rounded-3xl bg-white hover:opacity-90 p-4 sm:p-6 lg:p-8 h-full" href="">
                    <h2 className="text-md font-bold text-gray-900 sm:text-xl">{item.title}</h2>
                    <h2 className={`text-2xl font-bold ${item.color} sm:text-3xl`}>{item.price}</h2>
                    <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                    <ul className="pt-5 mx-auto">
                      {item.list.map((subList) => 
                        <li 
                          className={item.title == 'FREE PLAN' && disablePlan.indexOf(subList) !== -1 ? 'line-through':''}
                          key={subList}
                        >
                          {subList}
                        </li>
                      )}
                    </ul>
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full lg:max-w-screen-xl max-w-xs space-y-10 mt-4 mb-16 text-black">
            <div className="flex lg:space-x-8 lg:flex-row lg:flex-row lg:space-y-0 space-y-5 flex-col  px-5">
            {restTools.map((item, i) => 
                <div
                key={item.domain + i}
                  className={`transition duration-300 ease-in-out shadow-xl rounded-xl hover:rounded-3xl w-full lg:w-1/${restTools.length}`} 
                >
                  <a className="transition duration-300 ease-in-out block border border-lime-400 rounded-xl hover:rounded-3xl bg-white hover:bg-lime-200 p-2 sm:px-6 lg:p-auto h-full" href={item.url} target="_blank">
                    <figure>
                      <Image className="transition duration-300 ease-in-out w-24 mx-auto mask mask-squircle hover:invert" src={item.image} width={96} height={96} alt="image"/>
                    </figure>
                    <h2 className="lg:text-md text-full font-bold text-gray-900 sm:text-md">{item.domain}</h2>
                    <p className="mt-2 lg:text-md text-sm text-gray-500">{item.description}</p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
