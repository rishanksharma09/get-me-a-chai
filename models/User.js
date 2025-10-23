import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, required:true},
  username: {type:String, required:true},
  bio: {type:String},
  razorpayid: {type:String},
  razorpaysecret: {type:String},
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date, default:Date.now},
});

export default mongoose.models.User || mongoose.model("User", userSchema);
