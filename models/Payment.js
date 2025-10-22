import mongoose from "mongoose";



const paymentSchema = new mongoose.Schema({

  oid: {type:String, required:true},
  name: {type:String},
  message: {type:String},
  amount:{type:String,required:true},
  toUser: {type:String, required:true},
    fromUser: {type:String, required:true},
    status: {type:Boolean, default:false},
  createdAt: {type:Date, default:Date.now},
  updatedAt: {type:Date, default:Date.now},
});

export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
