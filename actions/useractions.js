"use server"
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import { use } from "react";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

export const createOrder = async (amount,to_username,from_username,name,message) => {
  try {
    const order = await razorpay.orders.create({
      amount:Number(amount)*100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value1",
        key2: "value2"
      }
    });
    await Payment.create({
      oid: order.id,
      toUser: to_username,
      fromUser: from_username,
      amount: amount,
      name: name,
      message: message,
      status: false
    });
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


export const fetchmessages = async (username) => {
  const response = await Payment.find({ status: true , toUser: username }).sort({ amount: -1 });
  const data = response.map((item) => ({
    name: item.name,
    message: item.message,
    amount: item.amount
  }));
  console.log(username);
  return data;
}


export const getuser= async (email) => {
  await connectDB();
  const response = await User.findOne({email:email});
  const data = {
    name: response.name,
    email: response.email,
    username: response.username,
    razorpayId: response.razorpayid,
    razorpaySecret: response.razorpaysecret
  };
  return data;
}
export const getuserfromusername= async (username) => {
  await connectDB();
  const response = await User.findOne({username:username});
  const data = {
    name: response.name,
    email: response.email,
    username: response.username,
    razorpayId: response.razorpayid,
    razorpaySecret: response.razorpaysecret
  };
  return data;
}