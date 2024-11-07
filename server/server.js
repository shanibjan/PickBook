import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import http from 'http';
import { Server } from 'socket.io';
import chatModel from "./models/chatModel.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://pickbook-app.onrender.com", // Replace with your client URL
    methods: ['GET', 'POST', 'PUT', 'DELETE']

  },
});

app.use(cors(cors));
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Serve the index.html file for any unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Use `server.listen` instead of `app.listen`
server.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
