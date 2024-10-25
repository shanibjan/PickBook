import express from "express";
import dotenv from "dotenv";
import profileModel from "../models/profileModel.js";
import postModel from "../models/postModel.js";

dotenv.config();
const router = express.Router();
router.post("/add-profile", async (req, res) => {
  try {
    const { userId, image, bio,userName } = req.body;

    const item = new profileModel({ image, bio, user: userId ,userName});

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

    const profile = await profileModel.find({userName });

    res.status(201).send(profile);
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
    const { userId, image, description,userName,userImage } = req.body;

    if (!image || !userId) {
      return res.status(400).send({ message: "upload image" });
    }

    const item = new postModel({ image, description, user: userId,userName,userImage });
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




router.get('/get-posts-for-users/:name',async(req,res)=>{
  try {
    const userName=req.params.name
   
    
    const posts= await postModel.find({userName})
     res.status(201).send(posts);
  } catch (error) {
    console.log(error);
  }
})

router.get('/get-allposts',async(req,res)=>{
  try {
   
    const posts= await postModel.find()
     res.status(201).send(posts);
  } catch (error) {
    console.log(error);
  }
})
export default router;
