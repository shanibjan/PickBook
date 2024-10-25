import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/userRoute.js'

dotenv.config();
const app = express()
app.use(cors());
connectDB();
app.use(express.json({ limit: '10mb' })); 



app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
  console.log(`server running successfully on ${PORT}`);
})