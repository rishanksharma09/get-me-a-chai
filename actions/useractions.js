"use server"
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import { use } from "react";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";






export const createOrder = async (amount,to_username,from_username,name,message) => {
  try {
    const razorpayDetails = await getrazorpaydetails(to_username);
    if (!razorpayDetails.razorpayId || !razorpayDetails.razorpaySecret) {
      throw new Error("Recipient has not set up Razorpay details.");
    }


    const razorpay = new Razorpay({
      key_id: razorpayDetails.razorpayId,
      key_secret: razorpayDetails.razorpaySecret
    });

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
    bio: response.bio,
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
    bio: response.bio,
    razorpayId: response.razorpayid,
    razorpaySecret: response.razorpaysecret
  };
  return data;
}
export const getrazorpaydetails= async (username) => {
  await connectDB();
  const response = await User.findOne({username:username});
  const data = {
    razorpayId: response.razorpayid,
    razorpaySecret: response.razorpaysecret
  };
  return data;
}
//put username email and name in db for first time login
export const createuser= async (name, email, username) => {
  await connectDB();
  const existingUser = await User.findOne({email: email});
  if (existingUser) {
    return;
  } else {
    const newUser = new User({
      name: name,
      email: email,
      username: username,
      bio: "",
      razorpayid: "",
      razorpaysecret: ""
    });
    await newUser.save();
  }}