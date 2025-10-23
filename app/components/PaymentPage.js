"use client";

import Script from 'next/script';
import React, { use } from 'react'
import { useState,useEffect} from 'react';
import { createOrder, getrazorpaydetails, getuserfromusername } from '@/actions/useractions';
import { fetchmessages } from '@/actions/useractions';
import { get, set } from 'mongoose';
import { getuser } from '@/actions/useractions';
import { useSession } from 'next-auth/react';


const PaymentPage = ({ username }) => {
    const { data: session } = useSession();
      const [client,setClient]=useState({name:"",amount:"",message:""});
      const handleName=(e)=>{
        if(e.target.value.length<21){
    
          setClient({...client,name:e.target.value});
        }
    
      }
      const handleAmount=(e)=>{
        if (/^\d*$/.test(e.target.value)) {
          const num = Number(e.target.value);
    
          // Allow empty (for typing) OR between 5 and 5000
          if (e.target.value === "" || (num >= 1 && num <= 10000)) {
            setClient({ ...client, amount: e.target.value });
          }
        }
      }
      const handleMessage=(e)=>{
        if(e.target.value.length<30){
          setClient({...client,message:e.target.value});
        }
      }
      const handlePay=async(e)=>{
        if(!client.amount){
          alert("Please enter amount");
          return;
        }
        const updatedClient = {
    name: client.name || "Anonymous",
    amount: client.amount,
    message: client.message || "Enjoy your chai!"
  };
        e.preventDefault();
        const order = await createOrder(updatedClient.amount,username,session.user.email,updatedClient.name,updatedClient.message);
        await handlePayment(updatedClient.amount, order.id);
        setClient({name:"",amount:"",message:""})
      }

    const handlePayment = async (amount, orderId) => {

      const razorpayDetails = await getrazorpaydetails(username);

      if (!razorpayDetails.razorpayId || !razorpayDetails.razorpaySecret) {
        throw new Error("Razorpay details not found.");
      }

        // Payment handling logic
        var options = {
    "key" : razorpayDetails.razorpayId, // Enter the Key ID generated from the Dashboard
    "amount": Number(amount)*100, // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Get me a Chai", //your business name
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": `${window.location.origin}/api/razorpay`,

    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "dashboard se ayega", //your customer's name
        "email": "dashboard se ayega",
        "contact": "dashboard se ayega" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

var rzp1 = new window.Razorpay(options);
    rzp1.open();
    }
    const [messages,setMessages]=useState([]);
    useEffect(()=>{
      
     
      
    },[]);
    
    
    const [user,setUser]=useState({});
    useEffect(() => {
      const fetchuserandmessages = async () => {
        const userData = await getuserfromusername(username);
        setUser(userData);
        const messages = await fetchmessages(userData.username);
        setMessages(messages);
      }
       fetchuserandmessages();

    }, [session]);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

    <div >
      <div className=" h-[33vh] overflow-hidden relative">
        <img className='w-full h-full object-cover object-center' src="/cover.jpg" alt="" />
      </div>
      <div>
        <div className=' w-32 h-32 rounded-full overflow-hidden absolute top-48 left-[46%] '>
          <img className='w-full h-full object-cover object-center' src="/placeholder-headshot.png" alt="" />
        </div>
        <div className='mt-17 flex flex-col  justify-center text-center text-white '>
          <h2 className='text-lg font-bold'>@{user.username} </h2>
          <p className='text-gray-500'>{user.bio}</p>
          <p className='text-gray-500'>{messages.length} supporters</p>
          <p className='text-gray-500'>{user.name} has raised ₹{messages.reduce((acc, item) => acc + Number(item.amount), 0).toLocaleString("en-IN")} till now</p>
        </div>
        <div className='flex justify-center my-12 gap-9 text-white'>
          <div className='w-[35vw] h-[30vh] bg-slate-900 p-4 pb-6 overflow-y-scroll '>
            <h3 className='p-2 text-lg text-white font-bold'>
              Supporters
            </h3>


            <div className='ml-3 flex flex-col gap-1 '>
              {!messages.length&&<p>No supporters yet. Be the first one to support!</p>}
              {messages.map((item)=>
              <div key={item._id} className='flex gap-1 items-center '>
                <div className='rounded-full w-[40px] h-[40px] overflow-hidden'>
                  <lord-icon
                    src="https://cdn.lordicon.com/hroklero.json"
                    trigger="loop"
                    delay="2000"
                    style={{ width: "30px", height: "30px" }}>
                  </lord-icon>
                </div>
                <p>{item.name} donated ₹{item.amount.toLocaleString("en-IN")} with a message &quot;{item.message}&quot;</p>
              </div>)}
  
              

            </div>

          </div>
          <div className='w-[35vw] min-h-[30vh]  bg-slate-900 p-4 px-8'>
            <h3 className=' text-lg text-white font-bold'>
              Make a payment
            </h3>
            <div className='flex flex-col gap-2 mt-2 justify-center items-center'>
              <input className='bg-slate-800 py-1 px-4 rounded-md w-full focus:outline-none ' type="text" placeholder='Enter Name (optional)' onChange={(e)=>handleName(e)} value={client.name}/>
              <input className='bg-slate-800 py-1 px-4 rounded-md w-full focus:outline-none' type="text" onChange={(e)=>handleMessage(e)} value={client.message} placeholder='Enter Message (Optional)'/>
              <div className='w-full flex justify-between'>
                <input onChange={(e)=>handleAmount(e)} value={client.amount} className='bg-slate-800 py-1 px-4 rounded-md w-[40%] focus:outline-none' type="text" placeholder='Enter Amount' inputMode="numeric"
  pattern="[0-9]*"/>
                <div className='flex gap-2'>

                <button onClick={()=>setClient({ ...client, amount: "100" })} className='bg-slate-800 py-1 px-1 rounded-md w-21  hover:bg-slate-700 cursor-pointer'>
                  Rs 100
                </button>
                <button onClick={()=>setClient({ ...client, amount: "500" })} className='bg-slate-800 py-1 px-1 rounded-md w-21 hover:bg-slate-700 cursor-pointer'>
                  Rs 500
                </button>
                <button onClick={()=>setClient({ ...client, amount: "1000" })} className='bg-slate-800 py-1 px-1 rounded-md w-21 hover:bg-slate-700 cursor-pointer'>
                  Rs 1000
                </button>
                </div>
                
              </div>
              <button
              onClick={(e)=>handlePay(e)}
                    type="submit"
                    className="w-[30%] px-3   bg-gradient-to-r from-green-400 to-blue-600 text-white py-1 rounded-2xl font-medium hover:opacity-80"
                >
                    Pay
                </button>
            </div>

          </div>
        </div>
      </div >
    </div>
  
      



    </>
  )
}

export default PaymentPage
