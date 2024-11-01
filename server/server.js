import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import http from 'http';
import { Server } from 'socket.io';
import chatModel from "./models/chatModel.js";

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client URL
    methods: ["GET", "POST"],
  },
});

app.use(cors());
connectDB();
app.use(express.json({ limit: '10mb' })); 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 7000;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', async ({ sender, receiver, message }) => {
    try {
      // Save the message to MongoDB
      const chatMessage = new chatModel({ sender, receiver, message });
      await chatMessage.save();
      

      // Emit the message to the receiver if they are connected
      io.emit('receiveMessage', chatMessage);
      
      console.log('Socket connected:', socket.connected);

      
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Use `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
