import express from "express";
import dotenv from "dotenv";
import profileModel from "../models/profileModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import notificationModel from "../models/notificationModel.js";
import chatModel from "../models/chatModel.js";
import chattersModel from "../models/chattersModel.js";
import mongoose from "mongoose";

dotenv.config();
const router = express.Router();
router.post("/add-profile", async (req, res) => {
  try {
    const { userId, image, bio, userName } = req.body;

    const item = new profileModel({ image, bio, user: userId, userName });

    const profile = await item.save();

    res.status(201).send({
      success: true,
      message: " profile added",
      profile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Add profile",
      error,
    });
  }
});

router.get("/get-profile-for-users/:name", async (req, res) => {
  try {
    const userName = req.params.name;

    const profile = await profileModel.findOne({ userName });
    const userDetails = await userModel.findOne({ name: userName })
    const userFollowers=await userModel.findOne({ name: userName }).populate('followers','name').populate('following','name')

    res.status(201).send({ profile, userDetails,followers:userFollowers.followers,following:userFollowers.following });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Add profile",
      error,
    });
  }
});



router.put("/edit-profile/:id", async (req, res) => {
  try {
    const profile = await profileModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "profile Updated",
      profile,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-post", async (req, res) => {
  try {
    const { userId, image, description, userName, profileData } = req.body;

    if (!image || !userId) {
      return res.status(400).send({ message: "upload image" });
    }

    const item = new postModel({
      image,
      description,
      user: userId,
      userName,
      profile: profileData,
    });
    const post = await item.save();
    res.status(201).send({
      success: true,
      message: " post added",
      post,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in Add profile",
      error,
    });
  }
});

router.get("/get-posts-for-users/:name", async (req, res) => {
  try {
    const userName = req.params.name;

    const posts = await postModel.find({ userName });
    res.status(201).send(posts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-allposts", async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("user", "name")
      .populate("profile", "image"); // Use populate directly on the find() query
    res.status(201).send(posts);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-post-over-view/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel
      .findOne({ _id: postId })
      .populate("user", "name")
      .populate("profile", "image");
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
  }
});

router.post("/like-post", async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const post = await postModel.findOne({ _id: postId });
    if (!post.like.includes(userId)) {
      post.like.push(userId);
      await post.save();
    }
    res.status(201).send({ post, message: true });
  } catch (error) {}
});

router.post("/dislike-post", async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await postModel.findOne({ _id: postId });
    post.like = post.like.filter((id) => id.toString() !== userId);
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.log(error);
  }
});

router.post("/add-comment", async (req, res) => {
  try {
    const { userName, profile, postId, comment } = req.body;

    const item = new commentModel({ userName, profile, post: postId, comment });
    const Comment = await item.save();

    res.status(201).send({
      success: true,
      message: " comment added",

      Comment,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-comment/:id", async (req, res) => {
  try {
    const post = req.params.id;

    const comment = await commentModel
      .find({ post })
      .populate("profile", "image");
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/remove-post/:id", async (req, res) => {
  try {
    const  postId  = req.params.id;
    console.log(postId);
    

    const post = await postModel.findByIdAndDelete({ _id: postId });
    res.status(201).send({
      success: true,
      message: "Post removed",
      post,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-all-comments", async (req, res) => {
  try {
    const comments = await commentModel.find();
    res.status(201).send(comments);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove-comment/:id", async (req, res) => {
  try {
    const commentId = req.params.id;

    await commentModel.findByIdAndDelete({ _id: commentId });
    res.status(201).send({
      success: true,
      message: " comment deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/follow", async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    const following = await userModel.findById({ _id: followingId });
    if (!following.followers.includes(followerId)) {
      following.followers.push(followerId);
    }
    await following.save();

    const follower = await userModel.findById({ _id: followerId });
    if (!follower.following.includes(followingId)) {
      follower.following.push(followingId);
    }
    await follower.save();
    res.status(201).send({ following, follower });
  } catch (error) {}
});

router.post('/unfollow',async(req,res)=>{
  try {
    const { followerId, followingId } = req.body;
    const following = await userModel.findById({ _id: followingId });
    following.followers=following.followers.filter((id)=>id.toString()!==followerId)
    await following.save();

    const follower = await userModel.findById({ _id: followerId });
    follower.following=follower.following.filter((id)=>id.toString()!==followingId)
    await follower.save();

    res.status(201).send({ following,follower });
  } catch (error) {
    
  }
})

router.get('/all-users',async(req,res)=>{
  try {
    const users= await userModel.find()
    const name=await users.map((m)=>{
      return m.name
    })
    res.status(201).send(name);
  } catch (error) {
    console.log(error);
    
  }
})

router.post('/noti-like',async(req,res)=>{
  try {
    const{postUser,likedUser,post,likedUserProfileId}=req.body
    console.log(postUser);
    console.log(likedUser);
    
    

    const like={postUser,likedUser,post,likedUserProfileId}
    
    

    let notification = await notificationModel.findOne({postUser});
   

    if (!notification) {
      notification = new notificationModel({postUser });
     
    }
    notification.like.push(like)

    await notification.save()
    res.status(201).send(notification.like);
  } catch (error) {
    console.log(error);
    
  }
})

router.post('/noti-follow',async(req,res)=>{
  try {
    const{follower,following,followerProfileId}=req.body

    const follow={follower,following,followerProfileId}
    console.log(follow);
    
    

    let notification = await notificationModel.findOne({postUser:following})
    
    if (!notification) {
      notification = new notificationModel({postUser:following })
     
    }
    notification.follow.push(follow)

    await notification.save()
    res.status(201).send(notification.follow);
  } catch (error) {
    console.log(error);
    
  }
})

router.get('/get-notification/:id',async(req,res)=>{
  try {
    const postUser=req.params.id
    const notification = await notificationModel.findOne({postUser}).populate('follow.followerProfileId','image')
    .populate('like.likedUserProfileId','image')
    res.status(201).send(notification);
  } catch (error) {
    console.log(error);
  }
})

router.post('/noti-dislike',async(req,res)=>{
  try {
    const{postUser,post,likedUser}=req.body
    const notification= await notificationModel.findOne({postUser})
    notification.like = notification.like.filter((like) => {
      return !(like.post === post && like.likedUser === likedUser);
    });
    
    await notification.save()
    res.status(201).send(notification.like);

  } catch (error) {
    console.log(error);
  }
})

router.post('/noti-unfollow',async(req,res)=>{
  try {
    const{postUser,unfollower}=req.body
    const notification= await notificationModel.findOne({postUser})
    notification.follow=notification.follow.filter((follow)=>follow.follower!==unfollower)
    await notification.save()
    res.status(201).send(notification.follow);

  } catch (error) {
    console.log(error);
  }
})

router.get('/get-messages/:sender/:receiver', async (req, res) => {
  const { sender, receiver } = req.params;
  
  try {
    const messages = await chatModel.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ createdAt: 1 }); // Sort by date to get messages in order

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

router.get('/get-profile-for-chat/:id',async(req,res)=>{
  try {
    const userId=req.params.id
    const profile=await profileModel.findOne({user:userId})
    if (!mongoose.Types.ObjectId.isValid(profile)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    
   
    res.status(200).json(
      profile,
    );
  } catch (error) {
    console.log(error);
    
  }
})

router.post('/add-chatters',async(req,res)=>{
  try {
    const{senderId,receiverId,receiverUserId,senderProfileId}=req.body
   
    

    let senderBar=await chattersModel.findOne({sender:senderId})
    let receiverBar=await chattersModel.findOne({sender:receiverUserId})
    if(!senderBar){
      senderBar = new chattersModel({sender:senderId})
    }
    if(!receiverBar){
      receiverBar = new chattersModel({sender:receiverUserId})
    }
    if(!senderBar.receivers.includes(receiverId)){
      senderBar.receivers.push(receiverId)
    }

    if(!receiverBar.receivers.includes(senderProfileId)){
      receiverBar.receivers.push(senderProfileId)
    }
    await senderBar.save()
    await receiverBar.save()
    res.status(201).send(senderBar);

  } catch (error) {
    console.log(error);
    
  }
})
router.get('/get-chatters/:id',async(req,res)=>{
  try {
    const senderId=req.params.id

    const chatters= await chattersModel.findOne({sender:senderId}).populate('receivers','userName image user')
    if(!chatters){
      return res.status(400).send({ message: "No messages yet" });
    }
    res.status(201).send(chatters.receivers);
  
    
  } catch (error) {
    console.log(error);
  }
})

export default router;
