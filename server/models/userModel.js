import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique:true,
    trim:true,
  },
  phone:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }],

  isPhoneVerified: { type: Boolean, default: false },
  verificationCode: { type: Number },
  
  
},
{
  timestamps:true
})



export default mongoose.model('users',userSchema)