import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";



export async function PUT(request) {
  await connectDB();
  const res = await request.json();
    const { formData } = res;


const updatedUser = await User.findOneAndUpdate({email:formData.email}, {
    $set: {
      name: formData.name,
      username: formData.username,
      razorpayid: formData.razorpayId,
      razorpaysecret: formData.razorpaySecret
    }
  });

  return new Response(JSON.stringify({message: "User updated successfully"}), {status: 200});
}