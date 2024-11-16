import express from "express";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Get these from your Twilio account
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
console.log(authToken);


router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).send({ message: "Enter a Phone number" });
    }

    const existingUser = await userModel.findOne({ phone });

    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered with this number",
      });
    }

    await client.verify.v2
      .services("VAb8cfca6eabf94d6b46362920b98cbf5b")
      .verifications.create({ to: phone, channel: "sms" })
      .then((verification) => console.log(verification.sid));

    res.status(200).send({ success: true, message: "OTP send successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sending OTP",
      error,
    });
  }
});

router.post("/send-otp-forgot-password", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).send({ message: "Enter a Phone number" });
    }

    const user = await userModel.findOne({ phone });

    // Existing user
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Not registered with this number",
      });
    }

    await client.verify.v2
      .services("VAb8cfca6eabf94d6b46362920b98cbf5b")
      .verifications.create({ to: phone, channel: "sms" })
      .then((verification) => console.log(verification.sid));

    res.status(200).send({ success: true, message: "OTP send successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sending OTP",
      error,
    });
  }
});

router.post("/verify-phone", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Find the user
    await client.verify.v2
      .services("VAb8cfca6eabf94d6b46362920b98cbf5b")
      .verificationChecks.create({ to: phone, code: otp })
      .then((verification_check) => console.log(verification_check.status));

    res
      .status(200)
      .send({ success: true, message: "Phone verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in phone verification",
      error,
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    // Validation
    if (!name || !phone || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if(phone.length !==13){
      return res.status(400).send({ message: "Invalid phone number" });
      
    }
    // Check user
    const existingUser = await userModel.findOne({ phone });

    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      phone,
       
      password: hashedPassword,
    }).save();

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

    // Save user
    
    // body: `Your verification code is: ${verificationCode}`,

    res.status(201).send({
      success: true,
      message: "User registered successfully. ",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Check user
    const user = await userModel.findOne({ phone });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Phone not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        password: user.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
});


router.put('/change-password',async(req,res)=>{
  try {
    const{phone,password}=req.body

  const user= await userModel.findOne({ phone });
  const hashedPassword = await hashPassword(password);
  user.password=hashedPassword
  await user.save();

  res.status(200).send({ success: true, message: 'Password changed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error updating password',
      error,
    });
  }
  
})


router.post("/change-password-login", async (req, res) => {
  try {
    const { userId, password, newPassword } = req.body;

    const user = await userModel.findOne({ _id: userId });
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password changed successfully",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        password: user.password,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error updating password",

      error,
    });
  }
});

export default router;
