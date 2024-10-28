import express from "express";
import dotenv from "dotenv";
import profileModel from "../models/profileModel.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";

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
router.delete("/remove-post", async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await postModel.findByIdAndDelete({ _id: postId });
    res.status(201).send({
      success: true,
      message: " comment added",
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

export default router;
