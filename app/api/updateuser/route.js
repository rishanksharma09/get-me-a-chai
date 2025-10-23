import User from "@/models/User";
import Payment from "@/models/Payment";
import { connectDB } from "@/lib/mongodb";



export async function PUT(request) {
  await connectDB();
  const res = await request.json();
    const { formData,oldusername } = res;

    //check if username is taken
    const existingUser = await User.findOne({ username: formData.username });
    if (existingUser && existingUser.email !== formData.email) {
      return new Response(JSON.stringify({ error: "Username already taken" }), { status: 409 });
    }

const updatedUser = await User.findOneAndUpdate({email:formData.email}, {
    $set: {
      name: formData.name,
      username: formData.username,
      bio: formData.bio,
      razorpayid: formData.razorpayId,
      razorpaysecret: formData.razorpaySecret
    }
  })
const updatedpayments = await Payment.updateMany({ 
  toUser: oldusername
}, {
  $set: {
    toUser: formData.username
  }
});

  return new Response(JSON.stringify({message: "User updated successfully"}), {status: 200});
}