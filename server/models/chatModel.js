// Chat Model (models/Chat.js)
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  message: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp.toTimeString().split(' ')[0] // Extract only the time (HH:MM:SS)
  },
});
chatSchema.set('toJSON', { getters: true });
chatSchema.set('toObject', { getters: true });

export default mongoose.model("chat", chatSchema);
