import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
  postUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    likedUser: { type: String, required: true },
    likedUserProfileId:{ type: mongoose.Schema.Types.ObjectId, ref: 'profile', required: true },
    post: { type: String, required: true },
  },{ timestamps: true });
  
  const followSchema = new mongoose.Schema({
    followerProfileId:{ type: mongoose.Schema.Types.ObjectId, ref: 'profile', required: true },
    follower: { type: String, required: true },
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },{ timestamps: true });
  
  const notificationSchema = new mongoose.Schema({
    postUser: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    like: [likeSchema],
    follow: [followSchema],
  }, { timestamps: true });
  
  export default mongoose.model('Notification', notificationSchema);
  