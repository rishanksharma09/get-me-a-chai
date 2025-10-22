import {connectDB} from '@/lib/mongodb';
import Payment from '@/models/Payment';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();

   const body = await request.formData();

    const razorpay_payment_id = body.get("razorpay_payment_id");
    const razorpay_order_id = body.get("razorpay_order_id");
    const razorpay_signature = body.get("razorpay_signature");

    // ✅ Generate signature using Node crypto
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET) // use server secret
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return new Response(
        JSON.stringify({ error: 'Payment verification failed' }),
        { status: 400 }
      );
    }
    const payment = await Payment.findOne({ oid: razorpay_order_id });
    if (payment) {
    // ✅ Update payment record
    await Payment.findOneAndUpdate(
      { oid: razorpay_order_id },
      { status: true }
    );

      return NextResponse.redirect(
  new URL(`/profile/${payment.toUser}`, request.url) // absolute URL based on request
);


    } else {
        console.error('Payment record not found for order ID:', razorpay_order_id);
      return new Response(
        JSON.stringify({ error: 'Payment record not found.' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
